import { GlowCard, Reveal, SectionHeading } from '@/components/ui'
import { features } from '@/constants/features'

export function Features() {
  return (
    <section id="product" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Platform"
          title={
            <>
              Everything you need.{' '}
              <span className="text-gradient">Nothing you don&apos;t.</span>
            </>
          }
          subtitle="A single, opinionated platform that handles the boring parts so you can focus on the product your users love."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description, gradient }, i) => (
            <Reveal key={title} delay={i * 80}>
              <GlowCard className="group h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20">
                <div
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {description}
                </p>
              </GlowCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
