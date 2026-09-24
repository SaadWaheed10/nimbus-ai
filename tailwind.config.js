export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        ink: {
          950: '#030308',
          900: '#05050d',
          800: '#070712',
          700: '#0b0b1a',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out both',
        'fade-up': 'fadeUp 0.8s ease-out both',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'aurora-1': 'aurora1 18s ease-in-out infinite',
        'aurora-2': 'aurora2 22s ease-in-out infinite',
        'aurora-3': 'aurora3 26s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'orbit': 'orbit 16s linear infinite',
        'beam': 'beam 7s ease-in-out infinite',
        'blink': 'blink 1.2s step-end infinite',
        'ticker': 'ticker 5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmerText: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        gridPan: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '48px 48px' },
        },
        aurora1: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%': { transform: 'translate(12%, 8%) scale(1.15)' },
          '66%': { transform: 'translate(-8%, 14%) scale(0.95)' },
        },
        aurora2: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '40%': { transform: 'translate(-14%, -6%) scale(1.2)' },
          '70%': { transform: 'translate(8%, -12%) scale(0.9)' },
        },
        aurora3: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '35%': { transform: 'translate(10%, -10%) scale(1.1)' },
          '75%': { transform: 'translate(-12%, 6%) scale(1.05)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(var(--orbit-r, 120px)) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(var(--orbit-r, 120px)) rotate(-360deg)' },
        },
        beam: {
          '0%, 100%': { transform: 'translateY(-10%)', opacity: '0' },
          '10%': { opacity: '1' },
          '50%': { transform: 'translateY(1100%)', opacity: '1' },
          '60%': { opacity: '0' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        ticker: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
