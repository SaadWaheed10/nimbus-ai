import { useSyncExternalStore } from 'react'

export type Provider = 'openrouter' | 'groq' | 'custom'

export interface AISettings {
  provider: Provider
  apiKey: string
  model: string
  baseUrl: string
}

const LS_KEY = 'nimbus.ai.settings'

export const PROVIDER_DEFAULTS: Record<
  Provider,
  { model: string; baseUrl: string; keyHint: string; docUrl: string }
> = {
  openrouter: {
    model: 'openrouter/auto',
    baseUrl: 'https://openrouter.ai/api/v1',
    keyHint: 'sk-or-…',
    docUrl: 'https://openrouter.ai/keys',
  },
  groq: {
    model: 'llama-3.3-70b-versatile',
    baseUrl: 'https://api.groq.com/openai/v1',
    keyHint: 'gsk_…',
    docUrl: 'https://console.groq.com/keys',
  },
  custom: {
    model: 'gpt-4o-mini',
    baseUrl: 'https://api.openai.com/v1',
    keyHint: 'sk-…',
    docUrl: 'https://platform.openai.com/api-keys',
  },
}

export const SYSTEM_PROMPT = `You are Nimbus AI, the official assistant of Nimbus — an AI-native edge deployment platform. You answer questions about the site and platform using ONLY the facts below. Be warm and human: handle greetings and small talk naturally before steering into substance. Keep answers under ~120 words, plain text with • bullets, and mention site routes like /pricing, /docs, /product, /company, /contact, /signin so the user can click through.

FACTS:
- Pricing: usage-based. Hobby $0 (100 GB bandwidth, unlimited personal projects, 1 GB KV). Pro $20/mo (1 TB bandwidth, previews, 99.99% SLA, 10 GB KV). Enterprise custom (SSO/SAML, dedicated GPU regions, 24/7 support, SOC 2 & HIPAA). Billed per GB-second compute + per million inference tokens. No seats, no minimums. /pricing
- Deploys: "nimbus deploy" is immutable, live in ~1.2s across 312 edge regions; every deploy keeps a URL so rollbacks are instant. Preview URLs for every branch. /docs
- AI inference: native at the edge via nimbus.ai.stream({ model: "nimbus-fast" }) — 200+ open models, GPU routing, pay-per-token, scale to zero; embeddings + vector index in the data plane.
- Network: 312 PoPs on 6 continents, anycast routing, p50 < 50ms for 95% of users, 99.99% uptime (90d).
- Data plane: Postgres, KV, queues, blob storage, vector index — one bill, edge-replicated.
- Security: SOC 2 Type II, GDPR, automatic TLS, DDoS mitigation, secrets management; Enterprise adds SSO/SAML, audit logs, HIPAA BAA.
- Frameworks: Next.js, React, SvelteKit, Astro, Remix, Vue, Python, Rust, Go — zero-config detection.
- Migrations: free "nimbus import --from vercel|netlify|aws" copies env vars, domains, build settings.
- Company: 120 people, 23 countries, remote-first, founded Lisbon 2021, $28M Series A (2023). Hiring — see /company. Contact sales/support at /contact (median reply 47 min). Status page: status.nimbus.app.
- Getting started: /signin with GitHub/Google, no credit card on Hobby, first deploy in about a minute.

If a question is outside these facts (weather, general knowledge, personal advice), say briefly that you only know Nimbus topics, then point to /contact or /docs — but still answer greetings, jokes about being an AI, and feelings-type questions conversationally.`

function endpointFor(s: AISettings): string {
  const base = (s.baseUrl || PROVIDER_DEFAULTS[s.provider].baseUrl).replace(/\/+$/, '')
  if (/\/(chat\/completions|completions)$/.test(base)) return base
  return `${base}/chat/completions`
}

export interface LlmMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

const listeners = new Set<() => void>()
let cached: AISettings | null = null
let loaded = false
let snapshot: { connected: boolean; provider: Provider | null } = {
  connected: false,
  provider: null,
}

function refreshSnapshot() {
  const connected = Boolean(cached?.apiKey)
  const provider = cached?.apiKey ? cached.provider : null
  if (snapshot.connected !== connected || snapshot.provider !== provider) {
    snapshot = { connected, provider }
  }
}

function notify() {
  for (const l of listeners) l()
}

export function loadSettings(): AISettings | null {
  if (loaded) return cached
  loaded = true
  try {
    const raw = localStorage.getItem(LS_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<AISettings>
      if (parsed && (parsed.provider === 'openrouter' || parsed.provider === 'groq' || parsed.provider === 'custom')) {
        cached = {
          provider: parsed.provider,
          apiKey: String(parsed.apiKey ?? ''),
          model: String(parsed.model ?? '') || PROVIDER_DEFAULTS[parsed.provider].model,
          baseUrl: String(parsed.baseUrl ?? '') || PROVIDER_DEFAULTS[parsed.provider].baseUrl,
        }
      }
    }
  } catch {
    cached = null
  }
  refreshSnapshot()
  return cached
}

export function saveSettings(s: Omit<AISettings, 'model' | 'baseUrl'> & { model?: string; baseUrl?: string }) {
  const d = PROVIDER_DEFAULTS[s.provider]
  const full: AISettings = {
    provider: s.provider,
    apiKey: s.apiKey.trim(),
    model: (s.model || '').trim() || d.model,
    baseUrl: (s.baseUrl || '').trim() || d.baseUrl,
  }
  cached = full
  loaded = true
  refreshSnapshot()
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(full))
  } catch {
    /* private mode */
  }
  notify()
}

export function clearSettings() {
  cached = null
  loaded = true
  refreshSnapshot()
  try {
    localStorage.removeItem(LS_KEY)
  } catch {
    /* noop */
  }
  notify()
}

export function aiStatusSnapshot() {
  loadSettings()
  return snapshot
}

export function useAIStatus() {
  return useSyncExternalStore(subscribeAIStatus, aiStatusSnapshot, aiStatusSnapshot)
}

export function subscribeAIStatus(cb: () => void) {
  listeners.add(cb)
  window.addEventListener('storage', cb)
  return () => {
    listeners.delete(cb)
    window.removeEventListener('storage', cb)
  }
}

export class AIError extends Error {}

export async function streamAI(opts: {
  settings: AISettings
  messages: LlmMessage[]
  onToken: (cumulative: string) => void
  signal?: AbortSignal
  maxTokens?: number
}): Promise<string> {
  const { settings, messages, onToken, signal, maxTokens = 512 } = opts
  let res: Response
  try {
    res = await fetch(endpointFor(settings), {
      method: 'POST',
      signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${settings.apiKey}`,
      },
      body: JSON.stringify({
        model: settings.model,
        messages,
        stream: true,
        max_tokens: maxTokens,
      }),
    })
  } catch (e) {
    if ((e as Error).name === 'AbortError') throw e
    throw new AIError('Network error reaching the AI provider.')
  }

  if (!res.ok) {
    let detail = ''
    try {
      const body = await res.text()
      detail = body.slice(0, 160)
    } catch {
      /* noop */
    }
    throw new AIError(
      res.status === 401 || res.status === 403
        ? 'API key rejected (401/403).'
        : res.status === 429
          ? 'Rate limited by the provider (429).'
          : `Provider error (${res.status}). ${detail}`,
    )
  }
  if (!res.body) throw new AIError('Streaming not supported by this response.')

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buf = ''
  let out = ''
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    buf += decoder.decode(value, { stream: true })
    const lines = buf.split('\n')
    buf = lines.pop() ?? ''
    for (const raw of lines) {
      const line = raw.trim()
      if (!line.startsWith('data:')) continue
      const data = line.slice(5).trim()
      if (!data || data === '[DONE]') continue
      try {
        const json = JSON.parse(data) as {
          choices?: { delta?: { content?: unknown }; message?: { content?: unknown } }[]
        }
        const delta = json.choices?.[0]?.delta?.content ?? json.choices?.[0]?.message?.content
        if (typeof delta === 'string' && delta) {
          out += delta
          onToken(out)
        }
      } catch {
        /* ignore keepalive fragments */
      }
    }
  }
  if (!out) throw new AIError('Empty response from the model.')
  return out
}
