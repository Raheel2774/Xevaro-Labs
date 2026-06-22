import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        graphite: '#0D0D0D',
        charcoal: '#111111',
        maroon: {
          50:  '#FFF1F1',
          100: '#FFE4E4',
          200: '#FFBDBD',
          300: '#FF8080',
          400: '#E53E3E',
          500: '#C41E1E',
          600: '#9B1C1C',
          700: '#7F1D1D',
          800: '#5C0F0F',
          900: '#3B0000',
          950: '#200000',
        },
        crimson: '#C41E1E',
        scarlet: '#E53E3E',
        wine:    '#6B0F1A',
        gray: {
          100: '#F8FAFC',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
      },
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial':   'radial-gradient(var(--tw-gradient-stops))',
        'maroon-glow':       'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(155,28,28,0.25), transparent)',
        'maroon-radial':     'radial-gradient(ellipse at center, rgba(155,28,28,0.25) 0%, transparent 70%)',
        'scarlet-radial':    'radial-gradient(ellipse at center, rgba(229,62,62,0.15) 0%, transparent 70%)',
      },
      animation: {
        'float':           'float 6s ease-in-out infinite',
        'float-delayed':   'float 6s ease-in-out 2s infinite',
        'float-slow':      'float 9s ease-in-out 1s infinite',
        'pulse-glow':      'pulseGlow 3s ease-in-out infinite',
        'marquee':         'marquee 30s linear infinite',
        'marquee2':        'marquee2 30s linear infinite',
        'spin-slow':       'spin 20s linear infinite',
        'shimmer':         'shimmer 2.5s linear infinite',
        'rotate-slow':     'rotate-slow 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-22px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%':      { opacity: '0.7', transform: 'scale(1.06)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marquee2: {
          '0%':   { transform: 'translateX(50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'rotate-slow': {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      boxShadow: {
        'maroon-glow':  '0 0 30px rgba(155,28,28,0.4), 0 0 80px rgba(155,28,28,0.15)',
        'scarlet-glow': '0 0 30px rgba(229,62,62,0.35)',
        'card':         '0 0 0 1px rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.5)',
        'card-hover':   '0 0 0 1px rgba(155,28,28,0.4), 0 8px 40px rgba(155,28,28,0.2)',
      },
    },
  },
  plugins: [],
}

export default config
