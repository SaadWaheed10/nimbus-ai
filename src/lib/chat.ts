import { useSyncExternalStore } from 'react'
import { loadSettings, streamAI, SYSTEM_PROMPT, AIError, type LlmMessage } from './ai'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  streaming?: boolean
  meta?: 'ai' | 'offline' | 'error'
}

interface ChatState {
  messages: ChatMessage[]
  thinking: boolean
  busy: boolean
}

const greeting: ChatMessage = {
  id: 'seed',
  role: 'assistant',
  content:
    "Hey — I'm Nimbus AI. I can answer anything about the platform: pricing, deploys, edge regions, our inference API, jobs, you name it.",
}

const listeners = new Set<() => void>()
let state: ChatState = { messages: [greeting], thinking: false, busy: false }
let controller: AbortController | null = null
let offlineToken = 0

function setState(partial: Partial<ChatState>) {
  state = { ...state, ...partial }
  for (const l of listeners) l()
}

function getSnapshot() {
  return state
}

let seq = 0
const nextId = () => `m${++seq}-${Date.now()}`

/* ------------------------------------------------------------------ */
/* Offline engine: scored intents, not first-match                    */
/* ------------------------------------------------------------------ */

interface Intent {
  id: string
  patterns: RegExp[]
  reply: () => string
}

const INTENTS: Intent[] = [
  {
    id: 'pricing',
    patterns: [/\bpric(e|es|ing)\b/i, /\bcost(s|ing)?\b/i, /\bbill(s|ing)?\b/i, /\bhow much\b/i, /\bplan(s)?\b/i, /\bfree\b/i, /\bcheap\b/i, /\bexpensive\b/i, /\b\$\d/i, /\busage[- ]based\b/i],
    reply: () =>
      'Pricing is usage-based — you pay per GB-second of compute and per million inference tokens:\n\n• Hobby — $0 forever: 100 GB bandwidth, unlimited personal projects\n• Pro — $20/mo: 1 TB bandwidth, preview environments, 99.99% SLA\n• Enterprise — custom: SSO, dedicated GPU regions, 24/7 support\n\nNo seats, no minimums, and you can check /pricing for the full breakdown.',
  },
  {
    id: 'jobs',
    patterns: [/\bjob(s)?\b/i, /\bhiring\b/i, /\bcareer(s)?\b/i, /\bwork (with|for|at)\b/i, /\bneed a job\b/i, /\bopen roles?\b/i, /\bvacanc(y|ies)\b/i, /\binterview\b/i, /\bapply\b/i, /\bposition\b/i],
    reply: () =>
      'We\'re hiring! Nimbus is 120 people across 23 countries, remote-first, founded in Lisbon in 2021. Right now we have open roles in Edge Runtime Engineering, AI Research, Product Design, and Developer Advocacy.\n\nCheck /company for the full list and culture, then message the careers team via /contact — hiring managers reply within a day.',
  },
  {
    id: 'deploy',
    patterns: [/\bdeploy(s|ing|ment)?\b/i, /\bship(ping)?\b/i, /\broll ?back\b/i, /\brelease(s)?\b/i, /\bbuild(s|ing)?\b/i, /\bpreview(s)? (env|url)\b/i, /\bhow (do|to|can) (i|we) (start|deploy|ship)\b/i],
    reply: () =>
      'Deploying takes about 60 seconds total:\n\n• npm i -g nimbus → nimbus link → nimbus deploy\n• Builds are immutable and activate in ~1.2s across all 312 regions\n• Every branch gets a preview URL; every deploy keeps its URL, so rollback is one click\n\nThe full walkthrough is in /docs → Quickstart.',
  },
  {
    id: 'ai',
    patterns: [/\bai\b/i, /\bllms?\b/i, /\bmodels?\b/i, /\binference\b/i, /\bgpt\b/i, /\bgpus?\b/i, /\btokens?\b/i, /\bembeddings?\b/i, /\bagents?\b/i, /\bvector\b/i, /\bmachine learning\b/i, /\bchatbot\b/i],
    reply: () =>
      'AI inference runs natively on the edge:\n\n• nimbus.ai.stream({ model: "nimbus-fast" }) streams tokens from 200+ open models\n• GPU autoscaling with pay-per-token billing — scale to zero between requests\n• Embeddings and a vector index are built into the data plane\n\nSee /docs → AI Inference Guide for code samples.',
  },
  {
    id: 'regions',
    patterns: [/\bregions?\b/i, /\bedge\b/i, /\blatenc(y|ies)\b/i, /\bfast(est)?\b/i, /\bslow(ly)?\b/i, /\bglobal\b/i, /\bcountries?\b/i, /\bwhere (is|are) (you|it)\b/i, /\bms\b/i, /\bpops?\b/i],
    reply: () =>
      'The network runs in 312 points of presence across 6 continents. Requests route via anycast to the nearest healthy region, so p50 latency stays under 50ms for about 95% of the planet. You never configure regions — regions = "auto" is genuinely the optimal setting.',
  },
  {
    id: 'security',
    patterns: [/\bsecure\b/i, /\bsecurity\b/i, /\bsoc ?2\b/i, /\bhipaa\b/i, /\bgdpr\b/i, /\bcompliance\b/i, /\bauth(ent ication|entication)?\b/i, /\bsso\b/i, /\bsaml\b/i, /\bencryption\b/i, /\bprivacy\b/i],
    reply: () =>
      'Security is baked in everywhere: SOC 2 Type II, GDPR, automatic TLS on every domain, DDoS mitigation at the network edge, and per-project secrets management. Enterprise adds SSO/SAML, audit logs, and a HIPAA BAA. Details at /product.',
  },
  {
    id: 'data',
    patterns: [/\bpostgres\b/i, /\bdatabase\b/i, /\bkv\b/i, /\bstorage\b/i, /\bqueues?\b/i, /\bblobs?\b/i, /\bredis\b/i, /\bmongo\b/i, /\bmysql\b/i, /\bcache\b/i],
    reply: () =>
      'The data plane ships managed Postgres, KV, queues, blob storage, and a native vector index — all connected, all on one bill, replicated to the edge with per-key strong consistency when you need it.',
  },
  {
    id: 'frameworks',
    patterns: [/\bnext\.?js?\b/i, /\breact\b/i, /\bsvelte/i, /\bastro\b/i, /\bremix\b/i, /\bvue\b/i, /\bnuxt\b/i, /\bpython\b/i, /\brust\b/i, /\bgolang|\bgo runtime\b|\bphp\b|\bjava\b/i, /\bframeworks?\b/i],
    reply: () =>
      'Nimbus runs all of them with zero config: Next.js, React, SvelteKit, Astro, Remix, Vue, plus Python, Rust, and Go runtimes. Detection reads your lockfile and picks the adapter — streaming works out of the box. /docs has per-framework guides.',
  },
  {
    id: 'migrate',
    patterns: [/\bmigrat(e|ing|ion)\b/i, /\bvercel\b/i, /\bnetlify\b/i, /\baws\b/i, /\bcloudflare\b/i, /\bheroku\b/i, /\bswitch(ing)? (to|from)\b/i, /\bcompare\b/i, /\bvs\.?\b/i],
    reply: () =>
      'Migration is free and mostly automatic: nimbus import --from vercel|netlify|aws copies env vars, domains, and build settings, then runs a shadow deploy so you can compare side by side before cutting traffic. Most teams finish in under an hour. Against Vercel specifically, teams usually see 4x faster cold starts and ~40–60% lower bills.',
  },
  {
    id: 'status',
    patterns: [/\bstatus\b/i, /\boutage\b/i, /\bdown\b/i, /\bincident(s)?\b/i, /\buptime\b/i, /\bsla\b/i, /\breliable\b/i],
    reply: () =>
      'Live status with per-region latency is at status.nimbus.app. Our 90-day uptime is 99.99%, and Enterprise plans carry a contractual SLA with automatic credits.',
  },
  {
    id: 'contact',
    patterns: [/\bcontact\b/i, /\bhuman\b/i, /\bsales\b/i, /\bsupport\b/i, /\bspeak\b/i, /\bcall\b/i, /\bdemo\b/i, /\btalk to (me|someone|a person)\b/i, /\bemail\b/i, /\bphone\b/i, /\bmeeting\b/i],
    reply: () =>
      'Happy to connect you with a real human: /contact routes straight to sales, support, press, or careers — median first reply is 47 minutes, 24/5. For a demo, pick "Sales" and we set it up same week.',
  },
  {
    id: 'signin',
    patterns: [/\b(sign ?up|sign ?in|log ?in|account|register|create)\b/i, /\bstart(ing)?\b/i, /\bbegin\b/i, /\btry\b/i, /\btrial\b/i, /\bget started\b/i, /\bsign me up\b/i],
    reply: () =>
      'You can start right now at /signin — GitHub or Google in one click, no credit card for the Hobby plan. Link a repo, run nimbus deploy, and your first project is live in about a minute.',
  },
  {
    id: 'docs',
    patterns: [/\bdocs?\b/i, /\bdocumentation\b/i, /\bguide(s)?\b/i, /\bapi reference\b/i, /\bmanual\b/i, /\bhow does it work\b/i, /\btutorial(s)?\b/i],
    reply: () =>
      '/docs has a 60-second quickstart, the full CLI reference, an AI inference guide, and per-service API docs. If you tell me what you\'re building, I can point you at the right section.',
  },
  {
    id: 'company',
    patterns: [/\bcompany\b/i, /\babout (you|nimbus|the company)\b/i, /\bwho (are you|made|built)\b/i, /\bfounded\b/i, /\bteam\b/i, /\blisbon\b/i, /\bfunding\b/i, /\bseries [abc]\b/i, /\bstory\b/i],
    reply: () =>
      'Nimbus was founded in Lisbon in 2021 by three infra engineers who believed deploying software should feel like sending a text. Today: 120 people, 23 countries, $28M raised, 40,000+ developers, $1B+ of traffic served monthly. /company has the whole story.',
  },
  {
    id: 'what-is',
    patterns: [/\bwhat (is|are|does)\b/i, /\bexplain\b/i, /\bnimbus\b/i, /\bdo you (do|support|offer)\b/i, /\bwhat can you do\b/i, /\bhelp\b/i, /\bcapabilities\b/i],
    reply: () =>
      'Nimbus is the AI-native edge platform: push code and it runs in 312 regions with sub-50ms latency, GPUs for inference, managed Postgres/KV/queues, and instant deploys included.\n\nI can go deep on pricing, deploys, the AI runtime, security, migrations, or jobs — what interests you?',
  },
]

const SMALLTALK: Intent[] = [
  {
    id: 'how-are-you',
    patterns: [/how (are|r) (you|u)\b/i, /\bhow'?s (it|everything|things|going)\b/i, /\bhow do you feel\b/i, /\byou (ok|good|alright)\b/i, /\bwhat'?s up\b/i, /\bhow are things\b/i],
    reply: () =>
      'Running at 99.99% uptime, so honestly — great 😄 Thanks for asking! What would you like to know about Nimbus?',
  },
  {
    id: 'greeting',
    patterns: [/^\s*(hi|hey|hello|yo|sup|hiya|howdy|hola)[\s!.,?]*$/i, /\bgood (morning|afternoon|evening)\b/i],
    reply: () =>
      'Hey there! Ask me anything about Nimbus — pricing, deploys, AI inference, regions, or how to get started.',
  },
  {
    id: 'thanks',
    patterns: [/\bthank(s| you)\b/i, /\bappreciate\b/i, /\bawesome\b/i, /\bgreat\b/i, /\bperfect\b/i, /\bnice\b/i, /\bcool\b/i, /\blove it\b/i],
    reply: () =>
      'Anytime! Anything else you want to dig into — or ready to try it live at /signin?',
  },
  {
    id: 'bye',
    patterns: [/\b(bye|goodbye|see (you|ya)|later|cya|gtg)\b/i],
    reply: () =>
      'Catch you later! The docs at /docs and the team at /contact will be here whenever you need them. 👋',
  },
  {
    id: 'bot-identity',
    patterns: [/\bare you (a )?(real|human|bot|robot|ai)\b/i, /\bwho are you\b/i, /\bwere you made by\b/i, /\bwhich model\b/i, /\bare you chatgpt\b/i, /\bartificial/i],
    reply: () =>
      'I\'m Nimbus AI — the platform assistant for this site. I know everything about Nimbus: pricing, deploys, the edge network, the inference API, and jobs. Ask away!',
  },
  {
    id: 'feeling',
    patterns: [/\bi('| a)?m (sad|happy|bored|excited|tired|angry|stressed)\b/i, /\b(joke|funny)\b/i, /\btell me something\b/i, /\bsing\b/i, /\bi need a job\b/i, /\blife\b/i],
    reply: () =>
      'Ha — I\'m a deployment platform assistant, so my advice is always going to circle back to the edge 😄 But seriously: if you\'re looking for work, we\'re hiring at /company, and for anything else the humans at /contact are lovely.',
  },
  {
    id: 'talk',
    patterns: [/\btalk(ing)? (to me|me)?\b/i, /\bsay (something|more|hi)\b/i, /\bchat\b/i, /\bwhat do you say\b/i, /\bcontinue\b/i, /\bgo on\b/i],
    reply: () =>
      'Happy to chat! I\'m best at all things Nimbus. Want a tour? Here are fan-favorite questions:\n\n• "How much does it cost?"\n• "How fast are deploys?"\n• "Can I run LLMs at the edge?"\n• "Are you hiring?"',
  },
]

function scoreIntent(intent: Intent, text: string): number {
  let hits = 0
  for (const p of intent.patterns) {
    if (p.test(text)) hits += p.source.length > 14 ? 2 : 1
  }
  return hits
}

const FALLBACKS = [
  'I might be missing that one — I know Nimbus topics best. Try /docs, or ask me about pricing, deploys, AI inference, regions, security, or careers.',
  'That one\'s outside my training snapshot, sorry! A human at /contact can help — meanwhile /docs covers the platform end to end.',
  'Hmm, I only know the public Nimbus site by heart. Ask me about pricing, the edge network, or how to deploy — or reach /contact.',
]

let fallbackIdx = 0

export function localReply(userText: string): string {
  const all = [...SMALLTALK, ...INTENTS]
  let best: Intent | null = null
  let bestScore = 0
  for (const intent of all) {
    const s = scoreIntent(intent, userText)
    if (s > bestScore) {
      bestScore = s
      best = intent
    }
  }
  if (best && bestScore >= 2) return best.reply()
  if (best && bestScore === 1 && /\b(nimbus|edge|deploy|price|ai|hiring)\b/i.test(userText)) return best.reply()
  return FALLBACKS[fallbackIdx++ % FALLBACKS.length]
}

/* ------------------------------------------------------------------ */
/* Send: prefer real AI, fall back to local engine                    */
/* ------------------------------------------------------------------ */

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

function patchMessage(id: string, patch: Partial<ChatMessage>) {
  setState({
    messages: state.messages.map((m) => (m.id === id ? { ...m, ...patch } : m)),
  })
}

function toLlmMessages(): LlmMessage[] {
  const history = state.messages
    .filter((m) => m.id !== 'seed' || m.content !== greeting.content)
    .filter((m) => !m.streaming)
    .slice(-11)
    .map((m) => ({ role: m.role, content: m.content }) as LlmMessage)
  return [{ role: 'system', content: SYSTEM_PROMPT }, ...history]
}

async function streamInto(id: string, text: string) {
  const token = offlineToken
  const words = text.split(/(\s+)/)
  let acc = state.messages.find((m) => m.id === id)?.content ?? ''
  for (const chunk of words) {
    if (token !== offlineToken) return
    acc += chunk
    patchMessage(id, { content: acc })
    await sleep(chunk.trim() ? 22 + Math.random() * 38 : 8)
  }
}

export async function sendChat(text: string) {
  const trimmed = text.trim()
  if (!trimmed || state.thinking || state.busy) return

  offlineToken++
  controller?.abort()
  controller = new AbortController()
  const myToken = offlineToken

  setState({
    messages: [...state.messages, { id: nextId(), role: 'user', content: trimmed }],
    thinking: true,
    busy: true,
  })

  const settings = loadSettings()
  const assistantId = nextId()
  let usedLiveAI = false

  if (settings?.apiKey) {
    try {
      await sleep(150)
      setState({
        messages: [
          ...state.messages,
          { id: assistantId, role: 'assistant', content: '', streaming: true, meta: 'ai' },
        ],
        thinking: false,
      })
      await streamAI({
        settings,
        messages: toLlmMessages(),
        signal: controller.signal,
        onToken: (cumulative) => {
          if (myToken !== offlineToken) return
          patchMessage(assistantId, { content: cumulative })
        },
      })
      if (myToken === offlineToken) patchMessage(assistantId, { streaming: false })
      usedLiveAI = true
    } catch (e) {
      if ((e as Error).name === 'AbortError') {
        setState({ busy: false, thinking: false })
        return
      }
      if (myToken !== offlineToken) return
      const reason = e instanceof AIError ? e.message : 'AI provider unreachable.'
      const exists = state.messages.some((m) => m.id === assistantId)
      if (!exists) {
        setState({
          messages: [
            ...state.messages,
            { id: assistantId, role: 'assistant', content: '', streaming: true, meta: 'offline' },
          ],
          thinking: false,
        })
      }
      patchMessage(assistantId, {
        meta: 'offline',
        content: `⚠️ Live AI hiccup (${reason}) — answering from offline knowledge:\n\n`,
      })
      await streamInto(assistantId, localReply(trimmed))
      if (myToken === offlineToken) patchMessage(assistantId, { streaming: false })
      usedLiveAI = true
    }
  }

  if (usedLiveAI) {
    setState({ busy: false })
    return
  }

  await sleep(400 + Math.random() * 450)
  if (myToken !== offlineToken) return
  setState({
    messages: [
      ...state.messages,
      { id: assistantId, role: 'assistant', content: '', streaming: true, meta: 'offline' },
    ],
    thinking: false,
  })
  await streamInto(assistantId, localReply(trimmed))
  if (myToken === offlineToken) patchMessage(assistantId, { streaming: false })
  setState({ busy: false })
}

export function stopChat() {
  offlineToken++
  controller?.abort()
  controller = null
  setState({
    thinking: false,
    busy: false,
    messages: state.messages.map((m) => (m.streaming ? { ...m, streaming: false } : m)),
  })
}

export function clearChat() {
  offlineToken++
  controller?.abort()
  controller = null
  setState({
    messages: [
      {
        id: nextId(),
        role: 'assistant',
        content: 'Fresh slate. What do you want to build today?',
      },
    ],
    thinking: false,
    busy: false,
  })
}

export function useChat() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => {
        listeners.delete(cb)
      }
    },
    getSnapshot,
    getSnapshot,
  )
}

export const chatSuggestions = [
  'How does pricing work?',
  'Deploy in 60 seconds?',
  'Run LLMs at the edge',
  'Are you hiring?',
]
