import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

/**
 * Interactive neural-network field rendered on a canvas.
 * Nodes drift, link to nearby nodes, pulse along the links like signals,
 * and are gently attracted to / repelled from the cursor.
 */
export function NeuralCanvas() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let nodes: Node[] = []
    let pulses: { a: number; b: number; t: number; speed: number }[] = []
    const mouse = { x: -9999, y: -9999 }
    let raf = 0
    let lastPulse = 0

    const LINK_DIST = () => Math.min(w, h) * 0.16

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const density = Math.max(36, Math.min(110, Math.floor((w * h) / 16000)))
      nodes = Array.from({ length: density }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        r: 0.8 + Math.random() * 1.6,
      }))
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    const step = (now: number) => {
      ctx.clearRect(0, 0, w, h)
      const link = LINK_DIST()

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1

        const dx = mouse.x - n.x
        const dy = mouse.y - n.y
        const d2 = dx * dx + dy * dy
        if (d2 < 180 * 180 && d2 > 1) {
          const d = Math.sqrt(d2)
          const f = ((180 - d) / 180) * 0.045
          n.x += (dx / d) * f * 10
          n.y += (dy / d) * f * 10
        }
      }

      if (now - lastPulse > 650 && nodes.length > 2) {
        lastPulse = now
        const a = Math.floor(Math.random() * nodes.length)
        let b = -1
        for (let i = 0; i < nodes.length; i++) {
          const dx = nodes[a].x - nodes[i].x
          const dy = nodes[a].y - nodes[i].y
          if (i !== a && dx * dx + dy * dy < link * link) {
            b = i
            break
          }
        }
        if (b >= 0) pulses.push({ a, b, t: 0, speed: 0.012 + Math.random() * 0.012 })
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const d = Math.hypot(dx, dy)
          if (d < link) {
            const alpha = (1 - d / link) * 0.16
            ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      pulses = pulses.filter((p) => p.t <= 1)
      for (const p of pulses) {
        p.t += p.speed
        const a = nodes[p.a]
        const b = nodes[p.b]
        if (!a || !b) continue
        const x = a.x + (b.x - a.x) * p.t
        const y = a.y + (b.y - a.y) * p.t
        const fade = Math.sin(Math.PI * Math.min(p.t, 1))
        const grad = ctx.createRadialGradient(x, y, 0, x, y, 10)
        grad.addColorStop(0, `rgba(232, 121, 249, ${0.9 * fade})`)
        grad.addColorStop(1, 'rgba(232, 121, 249, 0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(x, y, 10, 0, Math.PI * 2)
        ctx.fill()
      }

      for (const n of nodes) {
        ctx.fillStyle = 'rgba(165, 180, 252, 0.7)'
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(step)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerleave', onLeave)
    if (!reduced) raf = requestAnimationFrame(step)
    else {
      ctx.fillStyle = 'rgba(165, 180, 252, 0.4)'
      for (const n of nodes) {
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="absolute inset-0 h-full w-full opacity-70"
    />
  )
}

export default NeuralCanvas
