import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0A0E1A',
          elevated: '#111726',
          card: '#161D2E',
        },
        primary: {
          DEFAULT: '#1C2B4A',
          light: '#2A3D63',
          dark: '#131E35',
        },
        accent: {
          DEFAULT: '#3B82F6',
          light: '#60A5FA',
          dark: '#2563EB',
          violet: '#8B5CF6',
        },
        text: {
          DEFAULT: '#F8FAFC',
          muted: '#94A3B8',
          dim: '#64748B',
        },
        border: {
          DEFAULT: '#1E293B',
          light: '#334155',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 9vw, 7.5rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1', letterSpacing: '-0.035em' }],
        'display-md': ['clamp(2rem, 4.5vw, 3.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'gradient-shift': 'gradientShift 8s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'grid-fade': 'linear-gradient(to bottom, transparent, #0A0E1A 80%), linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}

export default config
