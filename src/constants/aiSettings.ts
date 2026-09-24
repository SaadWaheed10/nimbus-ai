import type { Provider } from '@/lib/ai'

export const PROVIDER_OPTIONS: { id: Provider; label: string; note: string }[] = [
  { id: 'openrouter', label: 'OpenRouter', note: '300+ models · free tier' },
  { id: 'groq', label: 'Groq', note: 'Llama · very fast · free tier' },
  { id: 'custom', label: 'OpenAI / custom', note: 'any OpenAI-compatible URL' },
]
