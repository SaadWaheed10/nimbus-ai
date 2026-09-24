import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Reveal, SectionHeading, GlowCard } from '@/components/ui'
import { values, timeline, team, openings, companyStats } from '@/constants/company'

export default function Company() {
  return (
    <div className="pt-32 sm:pt-40">
      <section className="mx-auto max-w-7xl px-6 text-center">
        <Reveal>
          <h1 className="mx-auto max-w-3xl text-balance text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
            We&apos;re making the cloud{' '}
            <span className="text-gradient-animated">disappear.</span>
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
            Nimbus is a remote-first team of 120 infrastructure obsessives
            spread across 23 countries. Our mission: make world-class
            computing feel instant, invisible, and boring — in the best way.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {companyStats.map((s) => (
              <div key={s.label} className="glass rounded-2xl px-4 py-6">
                <p className="bg-gradient-to-br from-white to-slate-400 bg-clip-text text-3xl font-extrabold text-transparent">
                  {s.value}
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto mt-28 max-w-7xl px-6">
        <SectionHeading eyebrow="Values" title="What we optimize for" />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 90}>
              <GlowCard className="h-full p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 ring-1 ring-white/10">
                  <v.icon className="h-5 w-5 text-indigo-300" />
                </span>
                <h3 className="mt-5 font-semibold text-white">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{v.body}</p>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-4xl px-6">
        <SectionHeading eyebrow="Journey" title="Four years, one obsession" />
        <div className="relative mt-16 space-y-10 before:absolute before:bottom-2 before:left-[7px] before:top-2 before:w-px before:bg-gradient-to-b before:from-indigo-500/60 before:via-fuchsia-500/40 before:to-transparent sm:space-y-14">
          {timeline.map((t, i) => (
            <Reveal key={t.year} delay={i * 100}>
              <div className="relative pl-10">
                <span className="absolute left-0 top-1.5 h-[15px] w-[15px] rounded-full border-2 border-fuchsia-400 bg-ink-950 shadow-[0_0_16px_rgba(232,121,249,0.6)]" />
                <p className="font-mono text-sm font-bold text-fuchsia-300">{t.year}</p>
                <h3 className="mt-1 text-lg font-semibold text-white">{t.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{t.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-7xl px-6">
        <SectionHeading eyebrow="Team" title="The humans behind the edge" />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 70}>
              <GlowCard className="group flex items-center gap-4 p-6 transition-all hover:-translate-y-0.5">
                <div
                  className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br ${m.color} text-lg font-black text-white shadow-lg transition-transform group-hover:scale-105 group-hover:rotate-2`}
                >
                  {m.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold text-white">{m.name}</p>
                  <p className="text-sm text-slate-400">{m.role}</p>
                </div>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto mt-28 max-w-5xl px-6">
        <Reveal>
          <div className="border-gradient rounded-3xl p-8 sm:p-12">
            <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight text-white">
                  Come build the edge with us.
                </h2>
                <p className="mt-2 max-w-md text-slate-400">
                  We&apos;re hiring across engineering, design, and go-to-market.
                  Remote-first, async by default, four-day weeks in August.
                </p>
              </div>
              <Link
                to="/contact"
                className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:shadow-lg hover:shadow-white/20"
              >
                Say hello
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="mt-10 space-y-3">
              {openings.map((o, i) => (
                <Reveal key={o.role} delay={i * 80}>
                  <a
                    href="#"
                    className="group flex flex-col gap-2 rounded-xl border border-white/[0.07] bg-white/[0.03] px-5 py-4 transition hover:border-fuchsia-400/30 hover:bg-white/[0.06] sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="font-semibold text-white">{o.role}</span>
                    <span className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="rounded-full border border-white/10 px-2.5 py-0.5">{o.team}</span>
                      <span>{o.location}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-slate-600 transition-all group-hover:translate-x-1 group-hover:text-fuchsia-400" />
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
