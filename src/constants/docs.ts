import { Rocket, Terminal, Blocks, Scale, type LucideIcon } from 'lucide-react'

export interface Guide {
  icon: LucideIcon
  title: string
  desc: string
  read: string
  color: string
}

export const guides: Guide[] = [
  {
    icon: Rocket,
    title: 'Quickstart',
    desc: 'Deploy your first edge app in under 60 seconds.',
    read: '5 min',
    color: 'from-emerald-400 to-teal-500',
  },
  {
    icon: Terminal,
    title: 'CLI Reference',
    desc: 'Every nimbus command, flag, and environment variable.',
    read: '12 min',
    color: 'from-sky-400 to-brand-500',
  },
  {
    icon: Blocks,
    title: 'AI Inference Guide',
    desc: 'Stream LLM responses, run embeddings, and wire up agents.',
    read: '9 min',
    color: 'from-fuchsia-400 to-purple-500',
  },
  {
    icon: Scale,
    title: 'Scaling & Limits',
    desc: 'How autoscaling works and which limits actually matter.',
    read: '7 min',
    color: 'from-amber-400 to-orange-500',
  },
]

export const topics = [
  { section: 'Getting Started', links: ['Installation', 'Project structure', 'Environment variables', 'Local development'] },
  { section: 'Compute', links: ['Functions', 'Cron jobs', 'Queues', 'Container runtime'] },
  { section: 'Data', links: ['Postgres', 'KV store', 'Vector index', 'Blob storage'] },
  { section: 'AI', links: ['Model catalog', 'Streaming', 'Embeddings', 'Fine-tuning'] },
  { section: 'Platform', links: ['Domains & TLS', 'Environments', 'Rollbacks', 'Audit logs'] },
]

export const QUICKSTART = `npm i -g nimbus
cd my-app && nimbus link
nimbus deploy --prod`
