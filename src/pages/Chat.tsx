import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  Send,
  Trash2,
  Sparkles,
  Bot,
  ArrowLeft,
  Square,
} from 'lucide-react'
import { useChat, sendChat, clearChat, stopChat, chatSuggestions } from '@/lib/chat'
import ChatBubble from '@/components/ChatBubble'
import AISettingsModal, { AIStatusChip } from '@/components/AISettings'
import { Reveal } from '@/components/ui'
import { caps } from '@/constants/chat'

export default function Chat() {
  const [input, setInput] = useState('')
  const [settingsOpen, setSettingsOpen] = useState(false)
  const { messages, thinking, busy } = useChat()
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const onlySeed = messages.length <= 1

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' })
  }, [messages, thinking])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const text = input
    setInput('')
    void sendChat(text)
  }

  const ask = (text: string) => {
    if (thinking || busy) return
    void sendChat(text)
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 pt-28 sm:px-6 sm:pt-32">
      <Reveal className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 shadow-lg shadow-fuchsia-500/30">
            <Bot className="h-6 w-6 text-white" />
            <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-slate-950 bg-emerald-400">
              <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
            </span>
          </span>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              Nimbus <span className="text-gradient">AI</span>
            </h1>
            <div className="mt-1">
              <AIStatusChip onClick={() => setSettingsOpen(true)} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={clearChat}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-white/25 hover:text-white"
          >
            <Trash2 className="h-4 w-4" />
            <span className="hidden sm:inline">New chat</span>
          </button>
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-white/25 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Exit</span>
          </Link>
        </div>
      </Reveal>

      <div
        ref={scrollRef}
        className="mt-8 flex-1 space-y-5 overflow-y-auto rounded-3xl border border-white/10 bg-slate-950/40 p-5 backdrop-blur-xl sm:p-8"
        style={{ maxHeight: 'calc(100vh - 21rem)' }}
      >
        {onlySeed && (
          <div className="mx-auto max-w-2xl py-6 text-center">
            <div className="ring-glow mx-auto grid h-20 w-20 animate-float place-items-center rounded-3xl bg-gradient-to-br from-indigo-500 to-fuchsia-500">
              <Sparkles className="h-9 w-9 text-white" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              How can I help you <span className="text-gradient-animated">build?</span>
            </h2>
            <p className="mx-auto mt-3 max-w-md text-slate-400">
              I know the whole Nimbus platform — pricing, deploys, the AI
              runtime, and the docs. Ask me anything or try a starter.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {chatSuggestions.map((s, i) => (
                <button
                  key={s}
                  onClick={() => ask(s)}
                  className="animate-fade-up group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 backdrop-blur transition hover:-translate-y-0.5 hover:border-fuchsia-400/40 hover:bg-white/10 hover:text-white"
                  style={{ animationDelay: `${200 + i * 80}ms` }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400 transition group-hover:scale-150" />
                  {s}
                </button>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              {caps.map((c) => (
                <span key={c.label} className="flex items-center gap-2 text-xs text-slate-500">
                  <c.icon className="h-3.5 w-3.5 text-indigo-400" />
                  {c.label}
                </span>
              ))}
            </div>
          </div>
        )}

        {messages.map((m) => (
          <ChatBubble key={m.id} message={m} />
        ))}

        {thinking && (
          <div className="flex items-end gap-2">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </span>
            <div className="glass flex gap-1.5 rounded-2xl rounded-bl-md px-5 py-4">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="animate-ticker h-2 w-2 rounded-full bg-fuchsia-400"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <form onSubmit={submit} className="mt-5 pb-8">
        <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-slate-950/60 p-2 shadow-xl shadow-black/40 backdrop-blur-xl transition focus-within:border-fuchsia-400/50 focus-within:ring-2 focus-within:ring-fuchsia-500/20">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message Nimbus AI…"
            className="w-full bg-transparent px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none"
          />
          <button
            type={busy ? 'button' : 'submit'}
            onClick={busy ? stopChat : undefined}
            disabled={busy ? false : !input.trim()}
            aria-label={busy ? 'Stop generating' : 'Send message'}
            className="group relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/30 transition enabled:hover:scale-105 enabled:active:scale-95 disabled:opacity-40"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            {busy ? <Square className="relative h-4 w-4 fill-current" /> : <Send className="relative h-5 w-5" />}
          </button>
        </div>
        <p className="mt-2 text-center text-[11px] text-slate-600">
          Nimbus AI can make mistakes. Verify important info in the{' '}
          <Link to="/docs" className="text-slate-500 underline-offset-2 hover:text-slate-300 hover:underline">
            docs
          </Link>
          .
        </p>
      </form>

      {settingsOpen && <AISettingsModal onClose={() => setSettingsOpen(false)} />}
    </div>
  )
}
