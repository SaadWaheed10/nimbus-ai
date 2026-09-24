import { Link } from 'react-router-dom'
import { Reveal } from '@/components/ui'
import { suggestions } from '@/constants/notFound'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 pt-32 pb-24">
      <div className="w-full max-w-2xl text-center">
        <Reveal>
          <p className="relative inline-block font-mono text-[7rem] font-black leading-none sm:text-[9rem]">
            <span className="text-gradient-animated">404</span>
            <span className="absolute inset-0 -z-10 blur-2xl opacity-60">
              <span className="text-gradient">404</span>
            </span>
          </p>
        </Reveal>
        <Reveal delay={120}>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            This route drifted past the edge.
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mx-auto mt-4 max-w-md text-slate-400">
            The page you&apos;re looking for doesn&apos;t exist in any of our
            312 regions. It may have been moved — or it never shipped.
          </p>
        </Reveal>
        <Reveal delay={280}>
          <div className="mx-auto mt-12 grid max-w-xl gap-3 sm:grid-cols-2">
            {suggestions.map((s) => (
              <Link
                key={s.to}
                to={s.to}
                className="group flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.03] px-5 py-4 text-left backdrop-blur transition-all hover:-translate-y-0.5 hover:border-fuchsia-400/30 hover:bg-white/[0.06]"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 ring-1 ring-white/10 transition group-hover:scale-105">
                  <s.icon className="h-4 w-4 text-indigo-300" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-white">{s.label}</span>
                  <span className="block text-xs text-slate-500">{s.desc}</span>
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
        <Reveal delay={360}>
          <p className="mt-10 font-mono text-xs text-slate-600">
            <span className="text-fuchsia-400">➜</span> nimbus resolve /this-page
            <span className="text-red-400"> error: not_found (routed to 0 regions)</span>
            <span className="animate-blink ml-1">▊</span>
          </p>
        </Reveal>
      </div>
    </div>
  )
}
