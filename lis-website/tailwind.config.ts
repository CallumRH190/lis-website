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
        // Primary brand
        navy: {
          DEFAULT: '#1E2B38',
          deep:    '#151f2a',
          mid:     '#263444',
        },
        // Framework accents
        eli: {
          DEFAULT: '#4C6A5E',
          light:   '#5e7f71',
          muted:   '#eaf0ed',
          border:  '#c0d0ca',
        },
        oci: {
          DEFAULT: '#C8A04A',
          light:   '#d4b06a',
          muted:   '#faf4e6',
          border:  '#e5d0a0',
        },
        limm: {
          DEFAULT: '#6A4C7D',
          light:   '#7d5e93',
          muted:   '#f0ebf5',
          border:  '#c9b8d8',
        },
        // Neutral palette
        surface: {
          DEFAULT: '#F4F6F8',
          card:    '#FFFFFF',
          muted:   '#E8ECF0',
          deep:    '#DDE2E8',
        },
        ink: {
          DEFAULT: '#1F2933',
          mid:     '#374151',
          soft:    '#5a6473',
          faint:   '#8e99a4',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Display scale
        'display-xl': ['clamp(2.5rem,  5.5vw, 4rem)',    { lineHeight: '1.07', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(2rem,    4vw,   3rem)',     { lineHeight: '1.1',  letterSpacing: '-0.02em'  }],
        'display-md': ['clamp(1.6rem,  2.8vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'display-sm': ['clamp(1.35rem, 2vw,   1.75rem)', { lineHeight: '1.2',  letterSpacing: '-0.01em'  }],
        // Body scale
        'body-xl': ['1.125rem',  { lineHeight: '1.75' }],
        'body-lg': ['1rem',      { lineHeight: '1.75' }],
        'body-md': ['0.9375rem', { lineHeight: '1.7'  }],
        'body-sm': ['0.875rem',  { lineHeight: '1.65' }],
        'body-xs': ['0.8125rem', { lineHeight: '1.6'  }],
        // UI labels
        'label':    ['0.6875rem', { lineHeight: '1', letterSpacing: '0.18em' }],
        'label-sm': ['0.625rem',  { lineHeight: '1', letterSpacing: '0.16em' }],
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      boxShadow: {
        'card':    '0 1px 3px rgba(30,43,56,0.06), 0 1px 2px rgba(30,43,56,0.04)',
        'card-md': '0 4px 12px rgba(30,43,56,0.08), 0 1px 3px rgba(30,43,56,0.04)',
        'lift':    '0 8px 24px rgba(30,43,56,0.10), 0 2px 6px rgba(30,43,56,0.06)',
      },
    },
  },
  plugins: [],
}

export default config
