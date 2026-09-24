import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react'
import { navItems } from '@/constants/navbar'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-strong shadow-lg shadow-black/40'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 shadow-lg shadow-indigo-500/40 transition-transform group-hover:scale-105">
            <span className="absolute inset-0 animate-spin-slow bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.5),transparent_40%)]" />
            <span className="relative text-lg font-black text-white">N</span>
          </span>
          <span className="text-xl font-bold tracking-tight text-white">
            Nimbus<span className="text-fuchsia-400">.</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="inline-flex items-center gap-1.5">
                    {item.to === '/chat' && (
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fuchsia-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                      </span>
                    )}
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/signin"
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
          >
            Sign in
          </Link>
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-all hover:shadow-lg hover:shadow-white/20 hover:scale-[1.02]"
          >
            Get started
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <button
          className="rounded-lg p-2 text-slate-300 transition hover:bg-white/10 hover:text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-300 md:hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="glass-strong space-y-1 border-t border-white/10 px-6 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="flex flex-col gap-2 border-t border-white/10 pt-4">
            <Link
              to="/signin"
              className="rounded-lg px-4 py-2.5 text-center text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white"
            >
              Sign in
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-900"
            >
              Get started
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export function AnnouncementBanner() {
  return (
    <Link
      to="/chat"
      className="group fixed bottom-5 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 px-4 py-2 text-xs font-medium text-slate-300 backdrop-blur-xl transition-all hover:border-fuchsia-400/40 hover:text-white lg:inline-flex"
    >
      <Sparkles className="h-3.5 w-3.5 text-fuchsia-400" />
      Ask Nimbus AI — the platform assistant is live
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  )
}

export default Navbar
