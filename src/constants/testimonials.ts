export interface Quote {
  name: string
  role: string
  company: string
  quote: string
  color: string
}

export const quotes: Quote[] = [
  {
    name: 'Sofia Reyes',
    role: 'Head of Engineering',
    company: 'Vertex',
    quote:
      'We migrated 200 services to Nimbus in a week. Deploy times went from 12 minutes to 40 seconds. It felt like cheating.',
    color: 'from-brand-400 to-fuchsia-500',
  },
  {
    name: 'Marcus Lee',
    role: 'CTO',
    company: 'Initech',
    quote:
      'The DX is unmatched. My team ships on Fridays without fear. Rollbacks, previews, and observability all just work.',
    color: 'from-amber-400 to-orange-500',
  },
  {
    name: 'Aisha Kamara',
    role: 'Staff Engineer',
    company: 'Hooli',
    quote:
      'We cut our infra bill by 60% and still got 4x faster cold starts. The edge runtime is genuinely a step change.',
    color: 'from-emerald-400 to-teal-500',
  },
]
