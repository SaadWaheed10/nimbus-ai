import { useState, type FormEvent } from 'react'
import { Send, Check } from 'lucide-react'
import { Reveal, SectionHeading, GlowCard, PrimaryButton } from '@/components/ui'
import { channels, teams } from '@/constants/contact'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [team, setTeam] = useState('sales')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="pt-32 sm:pt-40">
      <section className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              Talk to a human who{' '}
              <span className="text-gradient">builds the thing.</span>
            </>
          }
          subtitle="No chatbots pretending to be people. Route your message to the right team and we'll pick it up fast."
        />

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            {channels.map((c, i) => (
              <Reveal key={c.title} delay={i * 90}>
                <GlowCard className="flex items-start gap-4 p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-fuchsia-500/20 ring-1 ring-white/10">
                    <c.icon className="h-5 w-5 text-indigo-300" />
                  </span>
                  <div>
                    <p className="font-semibold text-white">{c.title}</p>
                    <p className="mt-1 text-sm text-slate-400">{c.body}</p>
                  </div>
                </GlowCard>
              </Reveal>
            ))}
            <Reveal delay={300}>
              <div className="glass overflow-hidden rounded-2xl">
                <div className="relative h-36">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_38%_45%,rgba(232,121,249,0.5),transparent_8%),radial-gradient(circle_at_62%_55%,rgba(129,140,248,0.5),transparent_8%),radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.4),transparent_14%)]" />
                  <div className="perspective-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
                  {Array.from({ length: 14 }).map((_, i) => (
                    <span
                      key={i}
                      className="animate-pulse-glow absolute h-1.5 w-1.5 rounded-full bg-fuchsia-300 shadow-[0_0_10px_rgba(232,121,249,0.9)]"
                      style={{
                        left: `${8 + ((i * 37) % 84)}%`,
                        top: `${14 + ((i * 53) % 66)}%`,
                        animationDelay: `${i * 320}ms`,
                      }}
                    />
                  ))}
                  <span className="absolute left-[46%] top-[40%] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_22px_rgba(103,232,249,1)]">
                    <span className="absolute inset-0 animate-ping rounded-full bg-cyan-300/60" />
                  </span>
                </div>
                <p className="border-t border-white/10 px-4 py-3 text-center text-xs text-slate-500">
                  Live traffic lighting up 312 edge regions right now
                </p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-3">
            <Reveal delay={150}>
              <div className="border-gradient rounded-2xl p-8">
                {sent ? (
                  <div className="flex flex-col items-center py-16 text-center">
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-400/40">
                      <Check className="h-8 w-8 text-emerald-400" />
                    </span>
                    <h3 className="mt-6 text-2xl font-bold text-white">Message received.</h3>
                    <p className="mt-2 max-w-sm text-sm text-slate-400">
                      The {teams.find((t) => t.id === team)?.label.toLowerCase()} team
                      will get back to you shortly. Check your inbox for a confirmation.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="mt-8 text-sm font-semibold text-fuchsia-300 transition hover:text-fuchsia-200"
                    >
                      Send another message →
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Route to</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {teams.map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setTeam(t.id)}
                            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                              team === t.id
                                ? 'bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/30'
                                : 'border border-white/10 bg-white/5 text-slate-300 hover:border-white/25 hover:text-white'
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                      <label className="block">
                        <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Name</span>
                        <input
                          required
                          type="text"
                          placeholder="Ada Lovelace"
                          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-600 transition focus:border-fuchsia-400/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20"
                        />
                      </label>
                      <label className="block">
                        <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Work email</span>
                        <input
                          required
                          type="email"
                          placeholder="ada@company.dev"
                          className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-600 transition focus:border-fuchsia-400/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20"
                        />
                      </label>
                    </div>

                    <label className="block">
                      <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Company</span>
                      <input
                        type="text"
                        placeholder="Analytical Engines Inc."
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-600 transition focus:border-fuchsia-400/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20"
                      />
                    </label>

                    <label className="block">
                      <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Message</span>
                      <textarea
                        required
                        rows={5}
                        placeholder="Tell us what you're building…"
                        className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-600 transition focus:border-fuchsia-400/50 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20"
                      />
                    </label>

                    <PrimaryButton type="submit" className="w-full sm:w-auto">
                      Send message
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </PrimaryButton>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
