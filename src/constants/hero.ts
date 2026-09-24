import { Globe2, Cpu, ShieldCheck, type LucideIcon } from 'lucide-react'

export const typedPhrases = [
  'ship at the speed of thought.',
  'run inference at the edge.',
  'scale to zero. burst to millions.',
  'deploy in 1.2 seconds flat.',
]

export const liveStats: { icon: LucideIcon; label: string; value: string }[] = [
  { icon: Globe2, label: 'Edge regions', value: '312' },
  { icon: Cpu, label: 'Models served / min', value: '1.4M' },
  { icon: ShieldCheck, label: 'Uptime (90d)', value: '99.99%' },
]
