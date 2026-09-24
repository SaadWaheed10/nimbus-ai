import NeuralCanvas from './NeuralCanvas'

/**
 * Fixed, full-viewport ambient background used on every screen:
 * aurora orbs + neural canvas + perspective grid horizon + scan beams + noise.
 */
export function BackgroundFX() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-ink-950">
      {/* deep base gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(67,56,202,0.28),transparent_60%),radial-gradient(ellipse_100%_60%_at_50%_120%,rgba(168,85,247,0.14),transparent_55%)]" />

      {/* drifting aurora orbs */}
      <div className="glow-orb animate-aurora-1 left-[-10%] top-[-15%] h-[42rem] w-[42rem] bg-indigo-600/25" />
      <div className="glow-orb animate-aurora-2 right-[-12%] top-[10%] h-[36rem] w-[36rem] bg-fuchsia-600/20" />
      <div className="glow-orb animate-aurora-3 bottom-[-20%] left-[25%] h-[40rem] w-[40rem] bg-cyan-500/12" />

      {/* neural network field */}
      <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_90%_75%_at_50%_40%,black_35%,transparent_80%)]">
        <NeuralCanvas />
      </div>

      {/* perspective grid horizon */}
      <div className="absolute inset-x-[-25%] bottom-0 h-[45vh] [perspective:600px]">
        <div className="perspective-grid h-full w-full origin-bottom [transform:rotateX(64deg)] [mask-image:linear-gradient(to_top,black_5%,transparent_75%)] opacity-60" />
      </div>

      {/* vertical scan beams */}
      <div className="absolute inset-y-0 left-[18%] w-px overflow-hidden">
        <div className="animate-beam h-40 w-px bg-gradient-to-b from-transparent via-indigo-400/70 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-[24%] w-px overflow-hidden [animation-delay:3s]">
        <div className="animate-beam h-52 w-px bg-gradient-to-b from-transparent via-fuchsia-400/60 to-transparent [animation-delay:3.5s]" />
      </div>

      {/* film grain */}
      <div className="noise-overlay absolute inset-0 opacity-[0.05] mix-blend-overlay" />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  )
}

export default BackgroundFX
