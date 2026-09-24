export const footerColumns: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: 'Product',
    links: [
      { label: 'Overview', to: '/product' },
      { label: 'Edge Runtime', to: '/product' },
      { label: 'AI Inference', to: '/product' },
      { label: 'Pricing', to: '/pricing' },
      { label: 'Changelog', to: '/company' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { label: 'Documentation', to: '/docs' },
      { label: 'Quickstart', to: '/docs' },
      { label: 'API Reference', to: '/docs' },
      { label: 'Guides', to: '/docs' },
      { label: 'Status', to: '/company' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', to: '/company' },
      { label: 'Careers', to: '/company' },
      { label: 'Blog', to: '/company' },
      { label: 'Contact', to: '/contact' },
      { label: 'Legal', to: '/company' },
    ],
  },
  {
    title: 'Account',
    links: [
      { label: 'Sign in', to: '/signin' },
      { label: 'Create account', to: '/signin' },
      { label: 'Nimbus AI', to: '/chat' },
      { label: 'Support', to: '/contact' },
      { label: 'Sales', to: '/contact' },
    ],
  },
]
