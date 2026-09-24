import { Check, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Reveal, SectionHeading } from '@/components/ui'
import { tiers } from '@/constants/pricing'

export function Pricing({ hideHeading = false }: { hideHeading?: boolean }) {
  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {!hideHeading && (
          <SectionHeading
            eyebrow="Pricing"
            title={
              <>
                Simple pricing.{' '}
                <span className="text-gradient">Infinite scale.</span>
              </>
            }
            subtitle="Start free. Scale when you do. Cancel any time."
          />
        )}

        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 120} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-2xl p-8 ${
                  t.highlight
                    ? 'border-gradient ring-glow lg:-translate-y-4 lg:scale-[1.03]'
                    : 'glass'
                }`}
              >
                {t.highlight && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-3 py-1 text-xs font-semibold text-white shadow-lg shadow-fuchsia-500/40">
                    <Sparkles className="h-3 w-3" />
                    Most popular
                  </span>
                )}
                <h3 className="text-lg font-semibold text-white">{t.name}</h3>
                <p className="mt-1 text-sm text-slate-400">{t.description}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold tracking-tight text-white">
                    {t.price}
                  </span>
                  {t.price !== 'Custom' && (
                    <span className="text-slate-400">/mo</span>
                  )}
                </div>
                <ul className="mt-6 flex-1 space-y-3">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-emerald-500/15">
                        <Check className="h-3 w-3 text-emerald-400" />
                      </span>
                      <span className="text-slate-300">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={t.price === 'Custom' ? '/contact' : '/signin'}
                  className={`mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all hover:scale-[1.01] ${
                    t.highlight
                      ? 'bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/30 hover:shadow-fuchsia-500/50'
                      : 'border border-white/15 bg-white/5 text-white hover:bg-white/10'
                  }`}
                >
                  {t.cta}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing
