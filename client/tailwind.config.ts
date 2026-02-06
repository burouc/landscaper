import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F5F0EB',
        terra: '#C4785C',
        'terra-dark': '#A8604A',
        panel: '#FFFFFF',
        border: '#E8E3DE',
        'grid-line': '#E0DCD7',
        'text-primary': '#2D2D2D',
        'text-secondary': '#6B6B6B',
        'text-muted': '#9B9B9B',
      },
    },
  },
  plugins: [],
};

export default config;
