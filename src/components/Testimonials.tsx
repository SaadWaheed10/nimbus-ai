import { Star } from 'lucide-react'
import { GlowCard, Reveal, SectionHeading } from '@/components/ui'
import { quotes } from '@/constants/testimonials'

export function Testimonials() {
  return (
    <section id="company" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Loved by developers"
          title={
            <>
              Don&apos;t take our word{' '}
              <span className="text-gradient">for it.</span>
            </>
          }
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {quotes.map((q, i) => (
            <Reveal key={q.name} delay={i * 100} as="figure">
              <GlowCard className="flex h-full flex-col justify-between p-6">
                <div>
                  <div className="flex gap-0.5 text-amber-400">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-sm leading-relaxed text-slate-300">
                    “{q.quote}”
                  </blockquote>
                </div>
                <figcaption className="mt-6 flex items-center gap-3">
                  <div
                    className={`grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br ${q.color} text-sm font-bold text-white shadow-md`}
                  >
                    {q.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{q.name}</p>
                    <p className="text-xs text-slate-500">
                      {q.role} · {q.company}
                    </p>
                  </div>
                </figcaption>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
