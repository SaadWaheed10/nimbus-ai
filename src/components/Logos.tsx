import { logos } from '@/constants/logos'

export function Logos() {
  return (
    <section className="relative border-y border-white/5 bg-white/[0.02] py-12 backdrop-blur-sm">
      <p className="text-center text-xs font-medium uppercase tracking-[0.25em] text-slate-500">
        Trusted by fast-moving teams worldwide
      </p>
      <div className="relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="animate-marquee flex w-max items-center gap-16 pr-16">
          {[...logos, ...logos].map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="select-none whitespace-nowrap text-2xl font-bold tracking-tight text-slate-600 transition-colors hover:text-slate-300"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Logos
