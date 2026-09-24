# Nimbus — AI-Native Edge Platform (Landing Site)

A fully animated, dark "modern AI" marketing site built with React + TypeScript + Vite + Tailwind CSS, featuring a real chatbot with streaming LLM responses.

## Requirements

- Node.js 18+ (developed on Node 25)
- npm (ships with Node)

## Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (hot reload)
npm run dev
# → open the URL Vite prints (this project's current session runs on
#   `vite --port 5199` → http://localhost:5199)

# 3. Production build (type-checks, then bundles to dist/)
npm run build

# 4. Preview the production build locally
npm run preview
```

## Linting & Type-checking

```bash
npm run lint      # ESLint
npx tsc -b        # strict TypeScript check (also runs inside npm run build)
```

## Optional: Enable the Live Chatbot LLM

The chatbot works offline out of the box. To make it fully conversational:

1. Get a free API key from [OpenRouter](https://openrouter.ai/keys) or [Groq](https://console.groq.com/keys)
2. In the app, open the chat (floating bubble bottom-right, or `/chat`)
3. Click **Connect AI** in the chat header, paste the key, save

The key is stored only in your browser's `localStorage` and is sent only to the provider you chose.

## Project Structure

See [PROJECT_DESCRIPTION.md](./PROJECT_DESCRIPTION.md) for the full folder hierarchy and architecture, and [DESIGN_THEME.md](./DESIGN_THEME.md) for colors, typography, animations, and design system.

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 + TypeScript 5 |
| Build | Vite 5 |
| Styling | Tailwind CSS 3 (custom dark theme) |
| Routing | React Router 7 |
| Icons | lucide-react |
| Chat | OpenAI-compatible streaming (SSE) + offline intent engine |
