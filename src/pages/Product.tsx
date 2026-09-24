import { Link } from 'react-router-dom'
import { ArrowRight, Cpu, Workflow } from 'lucide-react'
import { GlowCard, PrimaryButton, Reveal, SectionHeading } from '@/components/ui'
import { pillars, workflow, frameworks } from '@/constants/product'

export default function Product() {
  return (
    <div className="pt-32 sm:pt-40">
      <section className="mx-auto max-w-7xl px-6 text-center">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-fuchsia-300">
            <Cpu className="h-3.5 w-3.5" />
            The Platform
          </p>
        </Reveal>
        <Reveal delay={100}>
          <h1 className="mx-auto mt-6 max-w-3xl text-balance text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
            One platform.{' '}
            <span className="text-gradient-animated">Every primitive.</span>
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            Compute, data, AI, networking, and observability — designed to
            compose. Each primitive works alone; together they replace your
            entire infra backlog.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link to="/signin">
              <PrimaryButton>
                Start building
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </PrimaryButton>
            </Link>
            <Link
              to="/docs"
              className="text-sm font-semibold text-slate-300 underline-offset-4 transition hover:text-white hover:underline"
            >
              Read the docs →
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto mt-24 max-w-7xl px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 70}>
              <GlowCard className="group h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-110">
                    <p.icon className="h-5 w-5 text-indigo-300" />
                  </span>
                  <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    {p.tag}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.description}</p>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-7xl px-6">
        <SectionHeading
          eyebrow="Workflow"
          title={
            <>
              From <span className="text-gradient">git push</span> to global in seconds
            </>
          }
        />
        <div className="relative mt-16">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent lg:block" />
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {workflow.map((w, i) => (
              <Reveal key={w.step} delay={i * 120} className="relative">
                <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-ink-800 font-mono text-sm font-bold text-fuchsia-300 shadow-lg shadow-indigo-950/50">
                  {w.step}
                </div>
                <h3 className="mt-5 text-base font-semibold text-white">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{w.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-7xl px-6">
        <Reveal>
          <GlowCard className="grid items-center gap-8 overflow-hidden p-8 sm:p-12 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-cyan-300">
                <Workflow className="h-3.5 w-3.5" />
                Framework of the edge
              </div>
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Bring your framework. We run everything.
              </h2>
              <p className="mt-4 text-slate-400">
                First-class adapters for every major framework, zero-config
                detection, and streaming responses out of the box.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {frameworks.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-300 transition hover:border-fuchsia-400/40 hover:text-white"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
            <div className="border-gradient overflow-hidden rounded-xl font-mono text-[13px] leading-relaxed shadow-2xl shadow-indigo-950/50">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs text-slate-500">nimbus.toml</span>
              </div>
              <pre className="px-5 py-5 text-slate-300">
                <span className="text-slate-500">{'# zero-config by default'}{'\n'}</span>
                <span className="text-cyan-300">{'[edge]'}</span>{'\n'}
                runtime    = <span className="text-emerald-300">"v8-isolate"</span>{'\n'}
                regions  = <span className="text-emerald-300">"auto"</span>   <span className="text-slate-500">{'# 312 PoPs'}</span>{'\n'}
                {'\n'}
                <span className="text-cyan-300">{'[ai]'}</span>{'\n'}
                inference = <span className="text-emerald-300">"stream"</span>{'\n'}
                gpu       = <span className="text-amber-300">"on-demand"</span>
              </pre>
            </div>
          </GlowCard>
        </Reveal>
      </section>

      <section className="py-24 text-center">
        <Reveal>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            See what your stack could look like.
          </h2>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Link to="/pricing">
              <PrimaryButton>
                View pricing
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </PrimaryButton>
            </Link>
            <Link to="/contact">
              <span className="inline-flex items-center rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-slate-200 transition hover:bg-white/10 hover:text-white">
                Talk to an engineer
              </span>
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
