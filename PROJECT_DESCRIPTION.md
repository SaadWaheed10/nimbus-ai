# Project Description — Nimbus Landing

## What this project is

**Nimbus** is a single-page-application marketing site for a fictional AI-native edge-deployment platform. It is a dark, heavily animated "modern AI" UI with nine routed screens and a built-in assistant that can either run a real LLM (via a user-supplied OpenAI-compatible key) or answer from a bundled offline knowledge base of the site itself.

There is **no backend**. The chat engine, the settings store, and the analytics-style numbers are all client-side. The only outbound network calls are the optional chat completion requests to the provider you connect.

## Routes

| Path | Screen | Purpose |
|---|---|---|
| `/` | Home | Hero with typewriter headline, logo marquee, feature grid, testimonials, pricing, CTA |
| `/product` | Product | Six platform pillars, git-push workflow timeline, framework matrix + config preview |
| `/pricing` | Pricing | Feature-list hero, three tiers (reuses the shared Pricing section), FAQ accordion, sales/contact split |
| `/docs` | Docs | Search bar, popular guides, copy-to-clipboard quickstart terminal, topic index |
| `/company` | Company | Mission hero, stat cards, values, founding timeline, team grid, open roles |
| `/contact` | Contact | Animated "live edge traffic" globe panel, channel cards, routed contact form with success state |
| `/signin` | Sign in | Split auth screen — brand panel + OAuth/email form with simulated auth flow |
| `/chat` | Chat | Full-screen assistant. Hides the footer and floating widget so it isn't nested inside itself |
| `*` | 404 | Terminal-styled "route not found" with suggested destinations |

Any screen other than `/chat` also mounts `ChatWidget` — a floating gradient launcher that opens a compact chat panel. Widget and full page share one live conversation object, so a thread started in the widget continues on `/chat`.

## Folder structure

```
.
├── index.html                  # Vite entry: fonts (Inter + JetBrains Mono), meta, #root
├── package.json                # scripts: dev, build (tsc -b && vite build), lint, preview
├── vite.config.ts              # React plugin + '@' → './src' path alias
├── tailwind.config.js          # brand/ink palette, keyframes, animations, fonts
├── postcss.config.js           # tailwind + autoprefixer
├── tsconfig.json               # strict, noUnusedLocals/Parameters, @/* paths
└── src
    ├── main.tsx                # createRoot + StrictMode + BrowserRouter
    ├── App.tsx                 # layout shell, ScrollToTop, <Routes>, conditional widget/footer
    ├── index.css               # Tailwind layers + glass/border-gradient/spotlight/noise utilities
    ├── vite-env.d.ts           # Vite client types
    │
    ├── pages                   # one file per route, composition only
    │   ├── Home.tsx
    │   ├── Product.tsx
    │   ├── PricingPage.tsx     # mounted at /pricing
    │   ├── Docs.tsx
    │   ├── Company.tsx
    │   ├── Contact.tsx
    │   ├── SignIn.tsx
    │   ├── Chat.tsx
    │   └── NotFound.tsx
    │
    ├── components              # shared UI, no routing logic beyond <Link>
    │   ├── Navbar.tsx          # scroll-aware glass nav + AI-status announcement pill
    │   ├── Hero.tsx            # typewriter loop, deploy terminal, live stat cards
    │   ├── Logos.tsx           # infinite marquee
    │   ├── Features.tsx        # glow cards grid
    │   ├── Testimonials.tsx
    │   ├── Pricing.tsx         # tier cards; also reused inside /pricing
    │   ├── CTA.tsx
    │   ├── Footer.tsx
    │   ├── ui.tsx              # Reveal, GlowCard, SectionHeading, Primary/GhostButton
    │   ├── ChatWidget.tsx      # floating assistant panel
    │   ├── ChatBubble.tsx      # message rendering: inline code, route links, source badge
    │   ├── AISettings.tsx      # provider/key/model modal + status chip
    │   └── fx
    │       ├── BackgroundFX.tsx   # fixed ambient layer used on every screen
    │       └── NeuralCanvas.tsx   # interactive neural-network canvas
    │
    ├── constants               # ALL screen data arrays, one file per screen
    │   ├── navbar.ts  hero.ts  logos.ts  features.ts  testimonials.ts
    │   ├── pricing.ts footer.ts product.ts docs.ts company.ts
    │   ├── contact.ts pricingPage.ts chat.ts notFound.ts aiSettings.ts
    │
    └── lib                     # engine logic, no JSX
        ├── chat.ts             # chat store, intent engine, streaming orchestration
        └── ai.ts               # providers, system prompt, key storage, SSE client
```

### Where things live and why

**Presentation vs data.** Pages and components contain markup and behavior only. Every list of features, tiers, quotes, guides, team members, FAQs, and channel cards lives in `src/constants/`, typed, and is imported by the screen that owns it. Editing marketing copy never means touching JSX.

**Presentation vs logic.** `src/lib` holds the chat brain:

- `ai.ts` — provider table (OpenRouter / Groq / custom OpenAI-compatible), the fact-packed system prompt, key persistence in `localStorage` behind a `useSyncExternalStore` snapshot, and `streamAI()` which POSTs to `/chat/completions`, parses `data:` SSE lines, and hands back cumulative text token by token.
- `chat.ts` — a small external store holding `messages`, `thinking`, and `busy`. `sendChat()` prefers the live model when a key exists, otherwise falls through to the offline engine. On provider failure it keeps the UI honest: it surfaces the error inline, then answers from offline knowledge instead of dead-ending.

**The offline engine** scores ~23 intents (16 topic + 7 small-talk) against the user's message, weighting longer/more specific regex patterns higher, and requires a threshold before matching. That is what lets "how are you", "talk to me", and "I need a job" get real answers with zero configuration, while "weather in tokyo" correctly routes to a graceful fallback.

**Rendering the reply.** `ChatBubble` splits assistant text on inline code and on site routes, turning `/pricing`, `/docs`, `/contact` etc. into real `<Link>`s and `` `nimbus deploy` `` into code chips. A `● live llm` / `○ on-site knowledge` badge under each bubble labels its source.

### Animation architecture

- `fx/BackgroundFX.tsx` is one `fixed inset-0 -z-10` layer mounted once in `App.tsx`, so all nine screens share the same ambient scene: radial base gradient, three drifting aurora orbs, the masked neural canvas, a perspective grid horizon, two vertical scan beams, film grain, and a vignette.
- `fx/NeuralCanvas.tsx` draws 36–110 nodes (density scales with viewport), links neighbors within a radius, sends signal pulses along random links, and biases nodes toward the pointer. It respects `prefers-reduced-motion` and repaints static dots instead of animating.
- Keyframes live in `tailwind.config.js` (`aurora1-3`, `beam`, `blink`, `ticker`, `float`, `marquee`, `gridPan`, `fadeUp`, …) so markup stays declarative: `animate-aurora-1`, `animate-float-slow`.
- `components/ui.tsx` provides `Reveal` — an `IntersectionObserver` one-shot transition with a `delay` prop, used per-item for staggered entrances — and `GlowCard`, which tracks the pointer into CSS variables so `.card-spotlight` can place a radial highlight under the cursor.

### Re-render correctness note

`chat.ts` and `ai.ts` both use immutable snapshots with `useSyncExternalStore`. Returning a mutated singleton would make React skip every streamed token and only paint on the next local keystroke, which looks exactly like the bot replying while you type. Store objects are replaced, never patched.

### Known scope boundaries

Contact form, auth flow, and newsletter-style inputs are UI-complete but simulated — they hold state and show success screens without submitting anywhere. Stat numbers, testimonials, team, and pricing tiers are fictional demo content. The status page and social links are placeholders.
