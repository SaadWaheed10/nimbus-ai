import { useState } from 'react'
import { KeyRound, X, Cpu, ShieldCheck, ExternalLink, Check, Trash2 } from 'lucide-react'
import {
  loadSettings,
  saveSettings,
  clearSettings,
  useAIStatus,
  PROVIDER_DEFAULTS,
  type Provider,
} from '@/lib/ai'
import { PROVIDER_OPTIONS } from '@/constants/aiSettings'

export function AISettingsModal({ onClose }: { onClose: () => void }) {
  const existing = loadSettings()
  const [provider, setProvider] = useState<Provider>(existing?.provider ?? 'openrouter')
  const [key, setKey] = useState(existing?.apiKey ?? '')
  const [model, setModel] = useState(
    existing && existing.provider === 'openrouter' && existing.model !== PROVIDER_DEFAULTS.openrouter.model
      ? existing.model
      : existing?.model ?? PROVIDER_DEFAULTS[provider].model,
  )
  const [baseUrl, setBaseUrl] = useState(
    existing?.provider === provider ? existing.baseUrl : PROVIDER_DEFAULTS[provider].baseUrl,
  )
  const [showAdvanced, setShowAdvanced] = useState(provider === 'custom' || !!existing?.baseUrl)

  const defaults = PROVIDER_DEFAULTS[provider]
  const pick = (p: Provider) => {
    setProvider(p)
    setModel(PROVIDER_DEFAULTS[p].model)
    setBaseUrl(PROVIDER_DEFAULTS[p].baseUrl)
    setShowAdvanced(p === 'custom')
  }

  const save = () => {
    saveSettings({ provider, apiKey: key, model, baseUrl })
    onClose()
  }

  const forget = () => {
    clearSettings()
    setKey('')
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="glass-strong w-full max-w-md rounded-3xl p-6 shadow-2xl shadow-black/60"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 shadow-lg shadow-fuchsia-500/30">
              <KeyRound className="h-5 w-5 text-white" />
            </span>
            <div>
              <h3 className="font-bold text-white">Connect a live brain</h3>
              <p className="text-xs text-slate-400">
                Plug in any OpenAI-compatible key to make me truly conversational.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 grid gap-2">
          {PROVIDER_OPTIONS.map((p) => (
            <button
              key={p.id}
              onClick={() => pick(p.id)}
              className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition ${
                provider === p.id
                  ? 'border-fuchsia-400/50 bg-fuchsia-500/10'
                  : 'border-white/10 bg-white/5 hover:border-white/25'
              }`}
            >
              <span>
                <span className="block text-sm font-semibold text-white">{p.label}</span>
                <span className="block text-xs text-slate-400">{p.note}</span>
              </span>
              {provider === p.id && <Check className="h-4 w-4 text-fuchsia-300" />}
            </button>
          ))}
        </div>

        <div className="mt-4 space-y-3">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">API key</span>
            <input
              type="password"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder={defaults.keyHint}
              autoComplete="off"
              spellCheck={false}
              className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-mono text-sm text-white placeholder:text-slate-600 transition focus:border-fuchsia-400/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20"
            />
          </label>
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowAdvanced((v) => !v)}
              className="text-xs font-medium text-slate-400 transition hover:text-white"
            >
              {showAdvanced ? 'Hide' : 'Advanced'} (model & endpoint)
            </button>
            <a
              href={defaults.docUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-cyan-300 transition hover:text-cyan-200"
            >
              Get a free key <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          {showAdvanced && (
            <div className="grid gap-3">
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Model</span>
                <input
                  type="text"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder={defaults.model}
                  autoComplete="off"
                  spellCheck={false}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-mono text-sm text-white placeholder:text-slate-600 transition focus:border-fuchsia-400/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Base URL</span>
                <input
                  type="text"
                  value={baseUrl}
                  onChange={(e) => setBaseUrl(e.target.value)}
                  placeholder={defaults.baseUrl}
                  autoComplete="off"
                  spellCheck={false}
                  className="mt-1.5 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 font-mono text-sm text-white placeholder:text-slate-600 transition focus:border-fuchsia-400/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20"
                />
              </label>
            </div>
          )}
        </div>

        <div className="mt-5 flex items-start gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-3.5 py-3">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
          <p className="text-[11px] leading-relaxed text-slate-400">
            Your key lives in this browser&apos;s localStorage and goes straight to the
            provider you chose — never to Nimbus. Leave it empty and I keep working from
            my built-in knowledge of this site.
          </p>
        </div>

        <div className="mt-5 flex items-center gap-2">
          <button
            onClick={save}
            disabled={!key.trim()}
            className="flex-1 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/25 transition enabled:hover:scale-[1.01] disabled:opacity-40"
          >
            {key.trim() ? 'Connect & activate live AI' : 'Enter a key to activate'}
          </button>
          {existing?.apiKey && (
            <button
              onClick={forget}
              className="rounded-xl border border-white/10 bg-white/5 p-2.5 text-slate-400 transition hover:border-red-400/40 hover:text-red-300"
              title="Remove saved key"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export function AIStatusChip({ onClick }: { onClick: () => void }) {
  const status = useAIStatus()
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider transition ${
        status.connected
          ? 'border-emerald-400/40 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20'
          : 'border-white/10 bg-white/5 text-slate-400 hover:border-fuchsia-400/40 hover:text-white'
      }`}
      title={status.connected ? 'Live AI connected — click to manage' : 'Click to connect a live LLM'}
    >
      <span className="relative flex h-1.5 w-1.5">
        {status.connected && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        )}
        <span
          className={`relative inline-flex h-1.5 w-1.5 rounded-full ${status.connected ? 'bg-emerald-400' : 'bg-slate-500'}`}
        />
      </span>
      <Cpu className="h-3 w-3" />
      {status.connected ? status.provider : 'Connect AI'}
    </button>
  )
}

export default AISettingsModal
