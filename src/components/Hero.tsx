import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Terminal } from 'lucide-react'
import { Reveal, PrimaryButton, GhostButton } from '@/components/ui'
import { typedPhrases, liveStats } from '@/constants/hero'

function TypeLoop() {
  const [text, setText] = useState('')
  const [i, setI] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const full = typedPhrases[i % typedPhrases.length]
    const speed = deleting ? 28 : 55
    const t = setTimeout(() => {
      if (!deleting) {
        const next = full.slice(0, text.length + 1)
        setText(next)
        if (next === full) setTimeout(() => setDeleting(true), 1800)
      } else {
        const next = full.slice(0, text.length - 1)
        setText(next)
        if (next === '') {
          setDeleting(false)
          setI((v) => v + 1)
        }
      }
    }, speed)
    return () => clearTimeout(t)
  }, [text, deleting, i])

  return (
    <span className="text-gradient-animated">
      {text}
      <span className="animate-blink ml-0.5 inline-block h-[0.9em] w-[3px] translate-y-[0.12em] bg-fuchsia-400" />
    </span>
  )
}

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <Reveal>
          <Link
            to="/product"
            className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-slate-300 backdrop-blur transition-all hover:border-fuchsia-400/40 hover:bg-white/10 hover:text-white"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Introducing Nimbus 2.0 — inference-grade edge compute
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="mx-auto mt-8 max-w-4xl text-balance text-5xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Build apps that <TypeLoop />
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
            Nimbus is the AI-native deployment platform. Push code, and it runs
            within milliseconds of every human on Earth — with GPUs, storage,
            and observability built in. Zero config.
          </p>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/signin">
              <PrimaryButton className="w-full sm:w-auto">
                Start deploying free
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </PrimaryButton>
            </Link>
            <Link to="/contact">
              <GhostButton className="w-full sm:w-auto">
                <Terminal className="h-4 w-4 text-fuchsia-400" />
                Book a demo
              </GhostButton>
            </Link>
          </div>
        </Reveal>

        <Reveal delay={400} className="mx-auto mt-10 max-w-2xl">
          <div className="border-gradient mx-auto overflow-hidden rounded-2xl text-left font-mono text-[13px] leading-relaxed shadow-2xl shadow-indigo-950/60">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-xs text-slate-500">~/my-app — nimbus CLI</span>
            </div>
            <div className="space-y-1 px-5 py-5">
              <p><span className="text-fuchsia-400">➜</span> <span className="text-cyan-300">nimbus</span> deploy</p>
              <p className="text-slate-500">▲ Building for edge runtime (312 regions)…</p>
              <p className="text-slate-500">▲ Bundled 1.8 MB · cold start 4ms · GPU pools attached</p>
              <p className="text-emerald-400">● Deployed in 1.2s → https://my-app.nimbus.app</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={500}>
          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            {liveStats.map(({ icon: Icon, label, value }) => (
              <div key={label} className="glass rounded-xl px-4 py-4">
                <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-slate-500">
                  <Icon className="h-3.5 w-3.5 text-indigo-400" />
                  {label}
                </div>
                <p className="mt-1.5 text-2xl font-bold text-white">{value}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Hero
