import { Heart, Compass, Users, Radio, type LucideIcon } from 'lucide-react'

export interface CompanyValue {
  icon: LucideIcon
  title: string
  body: string
}

export const values: CompanyValue[] = [
  {
    icon: Compass,
    title: 'Operator mindset',
    body: 'We build for the developer at 3am. Clarity beats cleverness, every time.',
  },
  {
    icon: Heart,
    title: 'Craft over speedrun',
    body: 'We ship fast, but we polish the parts nobody sees. Quality is a feature.',
  },
  {
    icon: Users,
    title: 'Customers in the room',
    body: 'Every roadmap decision starts with a real conversation with a real team.',
  },
  {
    icon: Radio,
    title: 'Default to transparent',
    body: 'Public incident reports, public changelog, public salaries. Trust compounds.',
  },
]

export const timeline = [
  { year: '2021', title: 'Founded in a garage in Lisbon', body: 'Three infra engineers convinced that deploying software should feel like sending a text.' },
  { year: '2022', title: 'First 1,000 developers', body: 'The edge runtime went GA and teams started leaving their cloud bills behind.' },
  { year: '2023', title: 'Series A — $28M', body: 'Raised to expand GPU capacity across three continents and grow the core team to 40.' },
  { year: '2024', title: '312 regions live', body: 'Nimbus became the lowest-latency compute network on Earth (we checked).' },
  { year: '2025', title: 'Nimbus 2.0', body: 'Native AI inference at the edge. 40,000+ developers, $1B in traffic served monthly.' },
]

export const team = [
  { name: 'Elena Vasquez', role: 'Co-founder & CEO', color: 'from-indigo-400 to-fuchsia-500' },
  { name: 'David Osei', role: 'Co-founder & CTO', color: 'from-cyan-400 to-blue-500' },
  { name: 'Mira Tanaka', role: 'Co-founder, Head of Design', color: 'from-amber-400 to-orange-500' },
  { name: 'Jonas Weber', role: 'VP Engineering', color: 'from-emerald-400 to-teal-500' },
  { name: 'Priya Nair', role: 'Head of AI Platform', color: 'from-violet-400 to-purple-500' },
  { name: 'Tomás Ferreira', role: 'Head of Infrastructure', color: 'from-pink-400 to-rose-500' },
]

export const openings = [
  { role: 'Senior Edge Runtime Engineer', team: 'Compute', location: 'Remote (EU/US)' },
  { role: 'Research Engineer, Inference', team: 'AI', location: 'Lisbon / Remote' },
  { role: 'Product Designer, Platform', team: 'Design', location: 'Remote (Global)' },
  { role: 'Developer Advocate', team: 'Growth', location: 'Berlin' },
]

export const companyStats = [
  { value: '120', label: 'Team members' },
  { value: '23', label: 'Countries' },
  { value: '40K+', label: 'Developers' },
  { value: '$1B+', label: 'Traffic / mo' },
]
