import type { ChatMessage } from '@/lib/chat'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const LINK_ROUTES: { match: RegExp; to: string }[] = [
  { match: /\/pricing/, to: '/pricing' },
  { match: /\/docs/, to: '/docs' },
  { match: /\/contact/, to: '/contact' },
  { match: /\/company/, to: '/company' },
  { match: /\/signin/, to: '/signin' },
  { match: /\/product/, to: '/product' },
]

function renderInline(text: string, keyBase: string) {
  return text.split(/(`[^`]+`)/g).map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return (
        <code
          key={`${keyBase}-${i}`}
          className="rounded-md border border-white/10 bg-white/10 px-1.5 py-0.5 font-mono text-[0.85em] text-cyan-200"
        >
          {part.slice(1, -1)}
        </code>
      )
    }
    const route = LINK_ROUTES.find((r) => r.match.test(part))
    if (route) {
      return (
        <Link
          key={`${keyBase}-${i}`}
          to={route.to}
          className="inline-flex items-center gap-0.5 font-semibold text-cyan-300 underline-offset-2 hover:text-cyan-200 hover:underline"
        >
          {part}
          <ArrowRight className="h-3 w-3" />
        </Link>
      )
    }
    const bullet = part.startsWith('• ')
    return bullet ? (
      <span key={`${keyBase}-${i}`} className="block">
        <span className="text-fuchsia-400">•</span> {part.slice(2)}
      </span>
    ) : (
      <span key={`${keyBase}-${i}`}>{part}</span>
    )
  })
}

function renderContent(content: string) {
  const parts = content.split(
    /(?=\b(?:\/pricing|\/docs|\/contact|\/company|\/signin|\/product)\b)/g,
  )
  return parts.map((part, i) => {
    if (!part) return null
    const route = LINK_ROUTES.find((r) => r.match.test(part))
    if (route) {
      return (
        <span key={i}>
          {renderInline(part.slice(0, part.indexOf(route.to)), `p${i}`)}
          <Link
            to={route.to}
            className="mx-0.5 inline-flex items-center gap-0.5 rounded-md border border-cyan-400/30 bg-cyan-500/10 px-1.5 py-0.5 font-mono text-[0.82em] font-semibold text-cyan-200 underline-offset-2 transition hover:border-cyan-300/60 hover:text-white"
          >
            {route.to}
            <ArrowRight className="h-3 w-3" />
          </Link>
          {renderInline(part.slice(part.indexOf(route.to) + route.to.length), `q${i}`)}
        </span>
      )
    }
    return <span key={i}>{renderInline(part, `r${i}`)}</span>
  })
}

export function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user'
  return (
    <div className={`flex items-end gap-2 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 shadow-md shadow-fuchsia-500/30">
          <Sparkles className="h-3.5 w-3.5 text-white" />
        </span>
      )}
      <div className={`flex max-w-[80%] flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}>
        <div
          className={`whitespace-pre-wrap rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-md ${
            isUser
              ? 'rounded-br-md bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-indigo-900/40'
              : 'glass rounded-bl-md text-slate-200'
          }`}
        >
          {renderContent(message.content)}
          {message.streaming && (
            <span className="animate-blink ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[0.12em] bg-fuchsia-400" />
          )}
        </div>
        {!isUser && !message.streaming && message.meta && (
          <span
            className={`px-1 font-mono text-[9px] uppercase tracking-widest ${
              message.meta === 'ai' ? 'text-emerald-500/70' : 'text-slate-600'
            }`}
          >
            {message.meta === 'ai' ? '● live llm' : '○ on-site knowledge'}
          </span>
        )}
      </div>
    </div>
  )
}

export default ChatBubble
