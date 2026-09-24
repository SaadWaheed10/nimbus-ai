import {
  BrainCircuit,
  Database,
  Gauge,
  Layers,
  Network,
  Radio,
  type LucideIcon,
} from 'lucide-react'

export interface Pillar {
  icon: LucideIcon
  title: string
  tag: string
  description: string
}

export const pillars: Pillar[] = [
  {
    icon: BrainCircuit,
    title: 'Inference Engine',
    tag: 'AI',
    description:
      'Stream tokens from 200+ open models with automatic GPU routing. Pay per token, scale to zero between requests.',
  },
  {
    icon: Layers,
    title: 'Functions',
    tag: 'Compute',
    description:
      'Serverless functions with a 4ms cold start on V8 isolates. TypeScript, Python, and Rust runtimes on day one.',
  },
  {
    icon: Database,
    title: 'Data Plane',
    tag: 'Storage',
    description:
      'Postgres, KV, queues, and vector indexes — replicated to the edge with strong consistency where you need it.',
  },
  {
    icon: Radio,
    title: 'Realtime',
    tag: 'Channels',
    description:
      'WebSockets, SSE, and pub/sub with presence. One million concurrent connections per region, no tuning required.',
  },
  {
    icon: Network,
    title: 'Global Mesh',
    tag: 'Network',
    description:
      'Anycast ingress, smart routing around failures, and automatic TLS. Your traffic always takes the fastest path.',
  },
  {
    icon: Gauge,
    title: 'Observability',
    tag: 'Insights',
    description:
      'Traces, logs, and metrics correlated in one timeline. AI-assisted incident summaries the moment p95 spikes.',
  },
]

export const workflow = [
  { step: '01', title: 'Connect', body: 'Link a git repo or run `npx nimbus@latest init` in any framework.' },
  { step: '02', title: 'Develop', body: 'Local dev server mirrors the edge runtime, GPUs included.' },
  { step: '03', title: 'Ship', body: 'Every push produces an immutable, instantly-rollbackable deployment.' },
  { step: '04', title: 'Scale', body: 'Traffic-aware autoscaling across 312 regions. You touch nothing.' },
]

export const frameworks = ['React', 'Next.js', 'SvelteKit', 'Astro', 'Remix', 'Vue', 'Python', 'Rust', 'Go']
