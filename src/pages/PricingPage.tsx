import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, Check, MessageSquare } from 'lucide-react'
import { Reveal, SectionHeading, GlowCard } from '@/components/ui'
import Pricing from '@/components/Pricing'
import { faqs, included } from '@/constants/pricingPage'

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <button
      onClick={() => setOpen((v) => !v)}
      className="w-full rounded-2xl border border-white/[0.07] bg-white/[0.03] px-6 py-5 text-left backdrop-blur transition hover:border-white/15"
    >
      <div className="flex items-center justify-between gap-4">
        <span className="font-semibold text-white">{q}</span>
        <span
          className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/10 text-lg leading-none text-fuchsia-300 transition-transform duration-300 ${open ? 'rotate-45' : ''}`}
        >
          +
        </span>
      </div>
      <div
        className={`grid transition-all duration-300 ${open ? 'mt-3 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
      >
        <p className="overflow-hidden text-sm leading-relaxed text-slate-400">{a}</p>
      </div>
    </button>
  )
}

export default function PricingPage() {
  return (
    <div className="pt-32 sm:pt-40">
      <section className="mx-auto max-w-7xl px-6 text-center">
        <Reveal>
          <h1 className="mx-auto max-w-3xl text-balance text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
            Pay for the edge,{' '}
            <span className="text-gradient-animated">not the overhead.</span>
          </h1>
        </Reveal>
        <Reveal delay={120}>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            Transparent, usage-based pricing that scales down as happily as it
            scales up. Teams typically cut infra spend by 40–60% on day one.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {included.map((f) => (
              <li key={f} className="flex items-center gap-1.5 text-sm text-slate-400">
                <Check className="h-4 w-4 text-emerald-400" />
                {f}
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      <Pricing hideHeading />

      <section className="mx-auto max-w-4xl px-6">
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />
        <div className="mt-12 space-y-4">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 80}>
              <FaqItem {...f} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <GlowCard className="grid gap-8 p-8 sm:grid-cols-2 sm:p-12">
              <div>
                <CalendarDays className="h-8 w-8 text-fuchsia-400" />
                <h3 className="mt-4 text-xl font-bold text-white">Talk to sales</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Volume pricing, dedicated regions, procurement paperwork —
                  we&apos;ve done it a hundred times. A solutions engineer
                  replies within one business day.
                </p>
                <Link to="/contact" className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-fuchsia-300 transition hover:text-fuchsia-200">
                  Book a call
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              <div>
                <MessageSquare className="h-8 w-8 text-cyan-400" />
                <h3 className="mt-4 text-xl font-bold text-white">Still deciding?</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  Deploy something free right now and see your first invoice
                  before you commit to anything. The Hobby plan never expires.
                </p>
                <Link to="/signin" className="group mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200">
                  Start free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </GlowCard>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
