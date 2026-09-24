import { MapPin, Clock, Terminal, type LucideIcon } from 'lucide-react'

export interface ContactChannel {
  icon: LucideIcon
  title: string
  body: string
}

export const channels: ContactChannel[] = [
  { icon: MapPin, title: 'Headquarters', body: 'Rua do Alecrim 12, Lisbon, Portugal' },
  { icon: Clock, title: 'Response time', body: 'Median first reply: 47 minutes, 24/5' },
  { icon: Terminal, title: 'Urgent (on-call)', body: 'status.nimbus.app · #support on Slack' },
]

export const teams = [
  { id: 'sales', label: 'Sales' },
  { id: 'support', label: 'Support' },
  { id: 'press', label: 'Press' },
  { id: 'careers', label: 'Careers' },
]
