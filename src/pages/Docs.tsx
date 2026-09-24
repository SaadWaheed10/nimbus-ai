import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  BookOpen,
  Search,
  ChevronRight,
  Copy,
  Check,
} from 'lucide-react'
import { Reveal, SectionHeading } from '@/components/ui'
import { guides, topics, QUICKSTART } from '@/constants/docs'

function CodeBlock() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(QUICKSTART)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }
  return (
    <div className="border-gradient relative overflow-hidden rounded-xl">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <span className="font-mono text-xs text-slate-500">terminal</span>
        <button
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-400 transition hover:text-white"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-relaxed">
        <code>
          <span className="text-fuchsia-400">➜</span> <span className="text-slate-300">npm i -g nimbus</span>{'\n'}
          <span className="text-fuchsia-400">➜</span> <span className="text-slate-300">cd my-app && </span>
          <span className="text-cyan-300">nimbus</span> <span className="text-slate-300">link</span>{'\n'}
          <span className="text-slate-500">◐ Linked to team acme (312 regions ready)</span>{'\n'}
          <span className="text-fuchsia-400">➜</span> <span className="text-cyan-300">nimbus</span>{' '}
          <span className="text-slate-300">deploy --prod</span>{'\n'}
          <span className="text-emerald-400">● Live → https://my-app.nimbus.app (1.2s)</span>
        </code>
      </pre>
    </div>
  )
}

export default function Docs() {
  return (
    <div className="pt-32 sm:pt-40">
      <section className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Documentation"
          title={
            <>
              Everything you need to{' '}
              <span className="text-gradient">build on Nimbus</span>
            </>
          }
          subtitle="Guides, references, and recipes written by engineers who ship on the platform every day."
        />

        <Reveal delay={150} className="mx-auto mt-10 max-w-xl">
          <div className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur transition focus-within:border-fuchsia-400/50 focus-within:ring-2 focus-within:ring-fuchsia-500/20">
            <Search className="h-4 w-4 text-slate-500 transition group-focus-within:text-fuchsia-400" />
            <input
              type="text"
              placeholder="Search the docs…  ( ⌘K )"
              className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
            />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto mt-20 grid max-w-7xl gap-10 px-6 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-slate-500">
            <BookOpen className="h-4 w-4 text-indigo-400" />
            Popular guides
          </h2>
          <div className="mt-6 space-y-4">
            {guides.map((g, i) => (
              <Reveal key={g.title} delay={i * 80}>
                <a
                  href="#topics"
                  className="group flex items-start gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 backdrop-blur transition-all hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06]"
                >
                  <span className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${g.color} shadow-lg`}>
                    <g.icon className="h-5 w-5 text-white" />
                  </span>
                  <span className="flex-1">
                    <span className="flex items-center justify-between">
                      <span className="font-semibold text-white">{g.title}</span>
                      <ChevronRight className="h-4 w-4 text-slate-600 transition-all group-hover:translate-x-1 group-hover:text-fuchsia-400" />
                    </span>
                    <span className="mt-1 block text-sm text-slate-400">{g.desc}</span>
                    <span className="mt-2 inline-block text-xs text-slate-600">{g.read} read</span>
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3">
          <Reveal delay={120}>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-500">
              60-second deploy
            </h2>
            <div className="mt-6">
              <CodeBlock />
            </div>
          </Reveal>

          <Reveal delay={220} id="topics" className="mt-12 scroll-mt-32" as="div">
            <div className="grid gap-8 sm:grid-cols-2">
              {topics.map((t) => (
                <div key={t.section}>
                  <h3 className="text-sm font-semibold text-white">{t.section}</h3>
                  <ul className="mt-3 space-y-2">
                    {t.links.map((l) => (
                      <li key={l}>
                        <a
                          href="#topics"
                          className="group inline-flex items-center gap-1.5 text-sm text-slate-400 transition hover:text-white"
                        >
                          <span className="h-1 w-1 rounded-full bg-slate-700 transition group-hover:bg-fuchsia-400" />
                          {l}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 text-center">
        <Reveal>
          <div className="mx-auto max-w-2xl px-6">
            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              Can&apos;t find what you need?
            </h2>
            <p className="mt-3 text-slate-400">
              Our engineers answer in the community forum and directly in support chat — median first reply under 10 minutes.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Ask a question
              </Link>
              <Link
                to="/company"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/25 transition hover:shadow-fuchsia-500/40"
              >
                Meet the team
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}
