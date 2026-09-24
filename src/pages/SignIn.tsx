import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Github, Chrome, Loader2, ShieldCheck, ArrowLeft } from 'lucide-react'
import { Reveal, PrimaryButton } from '@/components/ui'

export default function SignIn() {
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)

  const startAuth = () => {
    setBusy(true)
    setTimeout(() => {
      setBusy(false)
      setDone(true)
    }, 1200)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    startAuth()
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-32">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl lg:grid-cols-2">
        {/* left: brand panel */}
        <div className="relative hidden flex-col justify-between overflow-hidden border-r border-white/10 bg-gradient-to-br from-indigo-950/70 via-ink-900 to-fuchsia-950/50 p-10 lg:flex">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="animate-aurora-1 absolute -left-24 -top-24 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
            <div className="animate-aurora-2 absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-fuchsia-500/25 blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          </div>
          <Link to="/" className="relative inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white">
            <ArrowLeft className="h-4 w-4" />
            Back to site
          </Link>
          <div className="relative">
            <div className="mb-6 flex gap-1.5">
              {['#6366f1', '#a855f7', '#ec4899', '#22d3ee'].map((c, i) => (
                <span
                  key={c}
                  className="animate-float h-2.5 w-2.5 rounded-full"
                  style={{ background: c, animationDelay: `${i * 400}ms` }}
                />
              ))}
            </div>
            <p className="text-2xl font-bold leading-snug text-white">
              “Deployed on a Tuesday.{' '}
              <span className="text-gradient">By Friday we forgot we had servers.</span>”
            </p>
            <p className="mt-4 text-sm text-slate-400">
              — every Nimbus team, probably
            </p>
          </div>
          <p className="relative flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            SOC 2 Type II · GDPR · 99.99% uptime SLA
          </p>
        </div>

        {/* right: form */}
        <Reveal className="glass-strong p-10 sm:p-12">
          {done ? (
            <div className="flex h-full min-h-[28rem] flex-col items-center justify-center text-center">
              <span className="ring-glow grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-2xl font-black text-white">
                N
              </span>
              <h2 className="mt-6 text-2xl font-bold text-white">Welcome back aboard.</h2>
              <p className="mt-2 max-w-xs text-sm text-slate-400">
                This is a demo console — in production you&apos;d be at your
                dashboard right now.
              </p>
              <Link to="/" className="mt-8 text-sm font-semibold text-fuchsia-300 transition hover:text-fuchsia-200">
                ← Return home
              </Link>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-extrabold tracking-tight text-white">
                Sign in to <span className="text-gradient">Nimbus</span>
              </h1>
              <p className="mt-2 text-sm text-slate-400">
                New here?{' '}
                <Link to="/pricing" className="font-semibold text-fuchsia-300 hover:text-fuchsia-200">
                  Start free
                </Link>
              </p>

              <div className="mt-8 space-y-3">
                <button
                  type="button"
                  onClick={startAuth}
                  className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <Github className="h-4 w-4" />
                  Continue with GitHub
                </button>
                <button
                  type="button"
                  onClick={startAuth}
                  className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <Chrome className="h-4 w-4" />
                  Continue with Google
                </button>
              </div>

              <div className="my-8 flex items-center gap-4">
                <span className="h-px flex-1 bg-white/10" />
                <span className="text-xs uppercase tracking-widest text-slate-600">or with email</span>
                <span className="h-px flex-1 bg-white/10" />
              </div>

              <form onSubmit={onSubmit} className="space-y-4">
                <label className="block">
                  <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Email</span>
                  <input
                    required
                    type="email"
                    placeholder="ada@company.dev"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-600 transition focus:border-fuchsia-400/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20"
                  />
                </label>
                <label className="block">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Password</span>
                    <button type="button" className="text-xs font-medium text-fuchsia-300 hover:text-fuchsia-200">
                      Forgot?
                    </button>
                  </div>
                  <input
                    required
                    type="password"
                    placeholder="••••••••••••"
                    className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-600 transition focus:border-fuchsia-400/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20"
                  />
                </label>
                <PrimaryButton type="submit" disabled={busy} className="w-full">
                  {busy ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Authenticating…
                    </>
                  ) : (
                    'Sign in'
                  )}
                </PrimaryButton>
              </form>

              <p className="mt-8 text-center text-xs text-slate-600">
                Protected by device checks · By continuing you agree to our{' '}
                <a href="#" className="underline underline-offset-2 hover:text-slate-400">Terms</a>
                {' '}and{' '}
                <a href="#" className="underline underline-offset-2 hover:text-slate-400">Privacy Policy</a>
              </p>
            </>
          )}
        </Reveal>
      </div>
    </div>
  )
}
