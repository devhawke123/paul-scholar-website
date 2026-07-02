import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0b1f3a',
        accent: '#ffa947',
        peach: '#ffc889',
        cream: '#fdf8f3',
        surface: '#f5f5f5',
        'peach-surface': 'color-mix(in srgb, #ffc889 52%, #fdf8f3)',
        'peach-highlight': 'color-mix(in srgb, #ffc889 38%, #fdf8f3)',
        'peach-banner': 'color-mix(in srgb, #ffc889 72%, #fdf8f3)',
      },
      fontFamily: {
        serif: ['Spectral', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-warm': 'var(--gradient-warm)',
        'gradient-accent': 'var(--gradient-accent)',
      },
    },
    screens: {
      xs: '320px',
      sm: '425px',
      md: '768px',
      lg: '1024px',
      xl: '1440px',
      '2xl': '2550px',
    },
  },
  plugins: [],
} satisfies Config
