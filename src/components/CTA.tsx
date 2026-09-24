import { ArrowRight, Terminal } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PrimaryButton, Reveal } from '@/components/ui'

export function CTA() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="ring-glow relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-950/80 via-slate-950 to-fuchsia-950/60 px-8 py-16 text-center sm:p-16">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
            >
              <div className="animate-aurora-1 absolute -left-20 -top-24 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
              <div className="animate-aurora-2 absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-fuchsia-500/30 blur-3xl" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
            </div>

            <div className="animate-float-slow absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-fuchsia-400/80 to-transparent" />

            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
              Ready to ship something{' '}
              <span className="text-gradient-animated">great?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-slate-300 sm:text-lg">
              Join 40,000+ developers building on Nimbus. Free to start, and
              your first deploy is live in under a minute.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link to="/signin">
                <PrimaryButton className="w-full sm:w-auto">
                  Start building free
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </PrimaryButton>
              </Link>
              <Link to="/docs">
                <button className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto">
                  <Terminal className="h-4 w-4 text-cyan-400" />
                  Read the docs
                </button>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default CTA
