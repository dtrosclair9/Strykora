import type { Config } from 'tailwindcss'

const bayou = {
  white: 'rgb(var(--white) / <alpha-value>)',
  wash: 'rgb(var(--wash) / <alpha-value>)',
  navy: 'rgb(var(--navy) / <alpha-value>)',
  deep: 'rgb(var(--deep-navy) / <alpha-value>)',
  slate: 'rgb(var(--slate) / <alpha-value>)',
  rust: 'rgb(var(--rust) / <alpha-value>)',
  hairline: 'rgb(var(--hairline) / <alpha-value>)',
}

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: { bayou },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-headline)', 'Impact', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
