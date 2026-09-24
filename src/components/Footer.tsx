import { Link } from 'react-router-dom'
import { Github, Twitter, Linkedin } from 'lucide-react'
import { footerColumns } from '@/constants/footer'

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-500/50 to-transparent" />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 shadow-lg shadow-indigo-500/40">
                <span className="text-lg font-black text-white">N</span>
              </span>
              <span className="text-xl font-bold tracking-tight text-white">
                Nimbus<span className="text-fuchsia-400">.</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              The intelligent edge platform. Build, deploy, and scale
              AI-native applications in 300+ regions.
            </p>
            <div className="mt-6 flex items-center gap-3 text-slate-500">
              <a href="#" aria-label="GitHub" className="rounded-lg border border-white/10 p-2 transition hover:border-white/30 hover:text-white">
                <Github className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Twitter" className="rounded-lg border border-white/10 p-2 transition hover:border-white/30 hover:text-white">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="rounded-lg border border-white/10 p-2 transition hover:border-white/30 hover:text-white">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Nimbus, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            All systems operational
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
