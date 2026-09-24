import { Home, Compass, Terminal, Cpu, type LucideIcon } from 'lucide-react'

export const suggestions: { to: string; label: string; icon: LucideIcon; desc: string }[] = [
  { to: '/', label: 'Home', icon: Home, desc: 'Back to the start' },
  { to: '/product', label: 'Product', icon: Cpu, desc: 'Explore the platform' },
  { to: '/docs', label: 'Docs', icon: Terminal, desc: 'Guides & references' },
  { to: '/company', label: 'Company', icon: Compass, desc: 'Who we are' },
]
