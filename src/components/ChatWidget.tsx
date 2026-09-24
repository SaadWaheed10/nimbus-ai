import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { MessageSquare, X, Send, Trash2, Maximize2, Sparkles, Bot } from 'lucide-react'
import { useChat, sendChat, clearChat, stopChat } from '@/lib/chat'
import { Square } from 'lucide-react'
import ChatBubble from './ChatBubble'
import AISettingsModal, { AIStatusChip } from './AISettings'

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [input, setInput] = useState('')
  const { messages, thinking, busy } = useChat()
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open, thinking])

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, thinking, open])

  const submit = (e: FormEvent) => {
    e.preventDefault()
    const text = input
    setInput('')
    void sendChat(text)
  }

  return (
    <>
      {open && (
        <div className="fixed inset-x-4 bottom-24 z-50 mx-auto flex h-[min(32rem,70vh)] max-w-md flex-col overflow-hidden rounded-3xl shadow-2xl shadow-black/60 ring-1 ring-white/10 backdrop-blur-2xl sm:left-auto sm:right-6 sm:inset-x-auto animate-fade-up">
          <div className="flex items-center justify-between border-b border-white/10 bg-slate-950/80 px-5 py-4">
            <div className="flex items-center gap-3">
              <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 shadow-lg shadow-fuchsia-500/30">
                <Bot className="h-5 w-5 text-white" />
                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-950 bg-emerald-400" />
              </span>
              <div>
                <p className="text-sm font-bold text-white">Nimbus AI</p>
                <div className="mt-0.5">
                  <AIStatusChip onClick={() => setSettingsOpen(true)} />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Link
                to="/chat"
                title="Expand to full screen"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                <Maximize2 className="h-4 w-4" />
              </Link>
              <button
                onClick={clearChat}
                title="Clear conversation"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                <Trash2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto bg-slate-950/60 px-4 py-5">
            {messages.map((m) => (
              <ChatBubble key={m.id} message={m} />
            ))}
            {thinking && (
              <div className="flex items-end gap-2">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500">
                  <Sparkles className="h-3.5 w-3.5 text-white" />
                </span>
                <div className="glass flex gap-1 rounded-2xl rounded-bl-md px-4 py-3">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="animate-ticker h-1.5 w-1.5 rounded-full bg-fuchsia-400"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <form onSubmit={submit} className="border-t border-white/10 bg-slate-950/80 p-3">
            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 focus-within:border-fuchsia-400/50 focus-within:ring-2 focus-within:ring-fuchsia-500/20">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about pricing, deploys, AI…"
                className="w-full bg-transparent py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none"
              />
              <button
                type={busy ? 'button' : 'submit'}
                onClick={busy ? stopChat : undefined}
                disabled={busy ? false : !input.trim()}
                aria-label={busy ? 'Stop generating' : 'Send message'}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/25 transition enabled:hover:scale-105 disabled:opacity-40"
              >
                {busy ? <Square className="h-3.5 w-3.5 fill-current" /> : <Send className="h-4 w-4" />}
              </button>
            </div>
          </form>
        </div>
      )}

      {settingsOpen && <AISettingsModal onClose={() => setSettingsOpen(false)} />}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close assistant' : 'Open assistant'}
        className="group fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-xl shadow-fuchsia-500/40 transition-all hover:scale-110 hover:rotate-3 active:scale-95"
      >
        <span className="absolute inset-0 animate-pulse-glow rounded-2xl bg-fuchsia-500/30 blur-xl" />
        {open ? (
          <X className="relative h-6 w-6" />
        ) : (
          <>
            <MessageSquare className="relative h-6 w-6 transition-transform group-hover:-translate-y-0.5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-slate-950 bg-emerald-400" />
            </span>
          </>
        )}
      </button>
    </>
  )
}

export default ChatWidget
