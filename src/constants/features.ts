import {
  Globe,
  Zap,
  ShieldCheck,
  GitBranch,
  LineChart,
  BrainCircuit,
  type LucideIcon,
} from 'lucide-react'

export interface FeatureItem {
  icon: LucideIcon
  title: string
  description: string
  gradient: string
}

export const features: FeatureItem[] = [
  {
    icon: BrainCircuit,
    title: 'AI inference, native',
    description:
      'Run LLMs and custom models at every edge PoP. Token streaming, vector search, and GPU autoscaling without a single YAML file.',
    gradient: 'from-fuchsia-400 to-purple-500',
  },
  {
    icon: Globe,
    title: 'Edge-first by default',
    description:
      'Your code runs in 312 regions worldwide. Users get sub-50ms responses no matter where they are on the planet.',
    gradient: 'from-sky-400 to-brand-500',
  },
  {
    icon: Zap,
    title: 'Instant deploys',
    description:
      'Push to git and ship in seconds. Immutable previews, atomic rollbacks, and zero-downtime releases on every commit.',
    gradient: 'from-amber-400 to-orange-500',
  },
  {
    icon: ShieldCheck,
    title: 'Secure & compliant',
    description:
      'SOC 2 Type II, automatic TLS, DDoS mitigation, and secrets management baked into every project from day one.',
    gradient: 'from-emerald-400 to-teal-500',
  },
  {
    icon: GitBranch,
    title: 'Preview everything',
    description:
      'Every branch gets a live URL with real data. Review, comment, and merge without ever leaving the browser.',
    gradient: 'from-violet-400 to-indigo-500',
  },
  {
    icon: LineChart,
    title: 'Realtime observability',
    description:
      'Logs, traces, metrics, and RUM unified in one dashboard. Query billions of events with SQL-level speed.',
    gradient: 'from-cyan-400 to-blue-500',
  },
]
