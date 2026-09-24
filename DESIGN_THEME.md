# Design & Theme — Nimbus

The visual language is **"modern-day AI"**: deep-space dark UI, glassmorphism, neon aurora glows, a live neural-network canvas, and gradient accents that animate. This file documents every token and utility so new screens stay on-theme.

## 1. Color system

### Base / surface

The site is dark-only (`color-scheme: dark`, `<html class="dark">`). Body background is `#030308`.

| Token | Hex | Role |
|---|---|---|
| `ink-950` | `#030308` | Page background (`bg-ink-950`) |
| `ink-900` | `#05050d` | Scrollbar track, deep insets |
| `ink-800` | `#070712` | Card fill inside `.border-gradient`, step badges |
| `ink-700` | `#0b0b1a` | Deeper surfaces (reserve) |

`ink` is defined alongside the default Tailwind `slate` ramp; slate is used for all text tones.

### Brand ramp — indigo (`brand-50…900`)

```
50  #eef2ff   100 #e0e7ff   200 #c7d2fe   300 #a5b4fc   400 #818cf8
500 #6366f1   600 #4f46e5   700 #4338ca   800 #3730a3   900 #312e81
```

`brand-500 (#6366f1)` is the primary accent. In practice the three working hues are:

- **Indigo / brand** — primary actions, links, neural node color (`rgba(165,180,252,…)`)
- **Fuchsia `#e879f9` / `#d946ef`** — the "AI" accent: cursor, badges, glow shadows, active nav underline
- **Cyan `#22d3ee`** — secondary accent: code, terminal prompts, "Get a free key" links, status globe center

Supporting semantic colors use Tailwind defaults: `emerald` (success / online / checks), `amber` (ratings), `red` (close dots / error).

### Text tones

| Usage | Class |
|---|---|
| Headings, primary text | `text-white` |
| Body copy | `text-slate-300 / 400` |
| Muted labels, captions | `text-slate-500 / 600` |
| Faint hints, terminal comments | `text-slate-500` / `--slate-600` |

Global `selection` is `fuchsia-500/30`.

### Gradients

Gradients do the heavy lifting and follow a fixed **indigo → violet → fuchsia** sweep with cyan as a counterpoint.

| Name | Definition | Where |
|---|---|---|
| Logo / launcher | `from-indigo-500 via-violet-500 to-fuchsia-500` (or `to-fuchsia-500`) | Brand mark, floating chat button, "live" mode |
| `text-gradient` | `from-indigo-300 via-fuchsia-300 to-cyan-300`, clipped | Section-heading spans |
| `text-gradient-animated` | `110deg #818cf8 → #e879f9 → #22d3ee → #818cf8`, `background-size:200%`, `animation: shimmerText 5s linear infinite` | Hero H1, CTA, page titles |
| Feature icon tiles | per-item `gradient` string in `constants/features.ts` (`from-sky-400 to-brand-500`, etc.) | Card icon chips |
| CTA panel | `from-indigo-950/80 via-slate-950 to-fuchsia-950/60` | Home closing banner |
| Auth panel | `from-indigo-950/70 via-ink-900 to-fuchsia-950/50` | Sign-in brand side |

### Shadow & glow

Shadows are always **colored**, never gray, to read as light emission:

- `shadow-indigo-500/30`, `shadow-fuchsia-500/25–40` on buttons and cards
- `.ring-glow` — the signature triple-layer emission:
  ```
  0 0 0 1px rgba(129,140,248,.2),
  0 0 40px -8px rgba(129,140,248,.45),
  0 0 80px -20px rgba(217,70,239,.3)
  ```
- Inline point-glow for nodes on the status globe: `shadow-[0_0_10px_rgba(232,121,249,.9)]`

## 2. Typography

| Family | Stack | Use |
|---|---|---|
| `font-sans` | `Inter, system-ui, sans-serif` | Everything |
| `font-mono` | `JetBrains Mono, ui-monospace, SFMono-Regular, monospace` | Terminals, CLI output, code chips, badges, 404 |

Both are loaded from Google Fonts in `index.html` (Inter 300–900, JetBrains Mono 400/500/700). `antialiased` is set on `<body>`.

Scale & style rules:

- Hero H1: `text-5xl → sm:6xl → lg:7xl`, `font-extrabold`, `tracking-tight`, `leading-[1.05]`, `text-balance`
- Page titles: `text-5xl → sm:6xl`, `font-extrabold`
- Section headings: `text-4xl → sm:5xl`
- Card titles: `text-lg font-semibold tracking-tight`
- Body: `text-sm` or `text-lg`, always `leading-relaxed`
- Eyebrows / labels: `text-xs uppercase tracking-widest` (or `tracking-[0.25em]` in the marquee)
- Copy is sentence-case with a **gradient-clipped emphasis phrase** at the end of the clause.

## 3. Glassmorphism & surfaces

Three tiers, all defined as `@layer components` in `src/index.css`:

| Utility | Recipe | Where |
|---|---|---|
| `.glass` | `border-white/[0.08] bg-white/[0.04] backdrop-blur-xl` | Cards, inputs, bubbles |
| `.glass-strong` | `border-white/10 bg-slate-950/60 backdrop-blur-2xl` | Sticky navbar, mobile menu, auth form |
| `.border-gradient` | `1px transparent border` + dual-background trick: solid `#070712` on `padding-box`, `135deg rgba(129,140,248,.6) → rgba(217,70,239,.35) 40% → rgba(34,211,238,.5)` on `border-box` | Featured pricing tier, terminal frames, contact form, auth shell |

The border-gradient trick means the border itself is a gradient stroke — used only for "premium"/hero surfaces so it stays meaningful.

Blobs are always `rounded-2xl` (cards) or `rounded-3xl` (panels/modals). Small chips are `rounded-full` or `rounded-xl`.

## 4. Signature effects (in `index.css`)

| Utility | Behavior |
|---|---|
| `.card-spotlight` | `::before` radial gradient positioned at CSS vars `--mx/--my`, opacity 0 → 1 on hover. Fed by `GlowCard`'s `onMouseMove`. |
| `.perspective-grid` | Two 1px line gradients, `rgba(99,102,241,.14)`, `48px` cells, `animation: gridPan 14s linear infinite` |
| `.noise-overlay` | Inline SVG `feTurbulence` fractal noise data-URI, `mix-blend-overlay`, ~5% opacity |
| `.glow-orb` | `absolute rounded-full blur-3xl pointer-events-none`, `will-change: transform` |

## 5. Motion system

All keyframes are declared in `tailwind.config.js` and consumed as `animate-*` classes — never as inline `@keyframes` in components.

| Animation | Duration / easing | Purpose |
|---|---|---|
| `aurora-1/2/3` | 18s / 22s / 26s, `ease-in-out`, infinite | Drifting + scaling background orbs (different paths so they never sync) |
| `float` | 6s; `float-slow` 10s | Hero orbs, idle dots, 404 glyph |
| `marquee` | 30s linear | Logo ticker (list duplicated once, translate −50%) |
| `fade-up` | 0.8s ease-out, `both` | Hero entrances with staggered inline `animationDelay` |
| `beam` | 7s ease-in-out | Vertical scan line travelling down a 1px column |
| `blink` | 1.2s `step-end` | Terminal / stream caret |
| `ticker` | 5s | Typing dots in chat |
| `pulse-glow` | 4s | Orb opacity; live globe nodes |
| `spin-slow` | 12s | Conic shine inside the logo mark |
| `gridPan` | 14s (via `.perspective-grid`) | Grid drift |
| `shimmerText` | 5–6s linear | Gradient text sweep |
| `ping` (built-in) | — | Status dots behind a solid dot |

Interaction transitions: cards lift `hover:-translate-y-1` with `transition-all duration-300`; buttons use `hover:scale-[1.02]` / `active:scale-[0.99]`; icons `group-hover:scale-110 group-hover:rotate-3`; arrows `group-hover:translate-x-1`.

**Scroll reveals** come from `Reveal` in `components/ui.tsx`: one-shot `IntersectionObserver` (threshold 0.15, then `disconnect`), transitioning `translate-y-8 opacity-0 blur-[2px] → translate-y-0 opacity-100 blur-0` over `700ms ease-out`, with `delay = index * 70–120ms` for stagger.

**Pointer-reactive layer:** `NeuralCanvas` biases nodes toward the cursor within 180px and emits a signal pulse every 650ms along a random link. Canvas density = `clamp(36, (w*h)/16000, 110)`. DPR capped at 2.

**Accessibility:** a global `prefers-reduced-motion` block flattens every animation and transition to ~0. The canvas also checks the media query and paints static dots instead of animating.

## 6. Layout & spacing

- Container: `mx-auto max-w-7xl px-6`; narrower reads use `max-w-2xl / 3xl / 4xl / 5xl` centered
- Sections: `py-24 sm:py-32`; page heroes start at `pt-32 sm:pt-40` to clear the fixed navbar
- Gaps: `gap-6` for card grids, `gap-3/4` for inline clusters, `space-y-3/5` for lists and form fields
- Grids: `sm:grid-cols-2 lg:grid-cols-3` for feature/testimonial trios, `lg:grid-cols-5` for docs split (2+3) and contact (2+3)
- Corner radii ladder: `rounded-lg` (buttons/nav) → `rounded-xl` (chips, inputs) → `rounded-2xl` (cards) → `rounded-3xl` (hero panels, modals)
- Z-order: background `‑z-10` · page content `auto` · navbar `z-50` · chat widget `z-50` · settings modal `z-[60]`

## 7. Components in `src/components/ui.tsx`

| Export | Contract |
|---|---|
| `Reveal` | `children, delay, className, id, as` — scroll-triggered entrance |
| `GlowCard` | `children, className` — `.glass` + `.card-spotlight` + pointer CSS vars |
| `SectionHeading` | `eyebrow, title, subtitle?, center?` — eyebrow pill with pinging dot, gradient-clipped title span |
| `PrimaryButton` | indigo→violet→fuchsia fill, light-sweep overlay on hover, `group` for child icon motion |
| `GhostButton` | `border-white/15 bg-white/5`, brightens on hover |
| `useInView` | raw observer hook |

Conventions: `children` is always last, `className` merges via template string, interactive wrappers use `group` + `group-hover:` on child icons. Chat's send button doubles as **Stop** while streaming.

## 8. Data & theming separation

All per-screen copy and card data lives in `src/constants/*.ts` (one file per screen, typed). Icons are stored as `LucideIcon` component references in those files, so a gradient string like `from-sky-400 to-brand-500` sits right next to the card it styles. Changing theme means editing `tailwind.config.js` + `index.css`; changing content means editing `constants/` — never JSX.

## 9. Do / Don't

**Do** reuse `.glass`, `.border-gradient`, `.ring-glow`, `text-gradient-animated`; keep gradients on the indigo→fuchsia→cyan axis; use `Reveal` with an index-based delay; keep shadows colored.

**Don't** introduce light-mode styles, gray/black shadows, new one-off `@keyframes` in CSS files (add them to `tailwind.config.js`), non-Inter/Mono fonts, or inline data arrays inside pages.
