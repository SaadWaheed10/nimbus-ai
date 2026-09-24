export interface Tier {
  name: string
  price: string
  description: string
  features: string[]
  cta: string
  highlight?: boolean
}

export const tiers: Tier[] = [
  {
    name: 'Hobby',
    price: '$0',
    description: 'For side projects and weekend experiments.',
    features: ['100 GB bandwidth', 'Unlimited personal projects', '1 GB KV storage', 'Community support'],
    cta: 'Start free',
  },
  {
    name: 'Pro',
    price: '$20',
    description: 'For production apps with real traffic.',
    features: ['1 TB bandwidth', 'Unlimited team projects', '10 GB KV storage', 'Preview environments', '99.99% uptime SLA'],
    cta: 'Start 14-day trial',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For teams that need scale, security, and support.',
    features: ['Unlimited bandwidth', 'SSO & SAML', 'Dedicated GPU regions', '24/7 priority support', 'SOC 2 & HIPAA'],
    cta: 'Talk to sales',
  },
]
