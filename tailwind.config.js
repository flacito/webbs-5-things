/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        // GitHub theme colors via CSS variables
        'gh-bg': 'var(--gh-bg)',
        'gh-bg-secondary': 'var(--gh-bg-secondary)',
        'gh-text': 'var(--gh-text)',
        'gh-heading': 'var(--gh-heading)',
        'gh-accent': 'var(--gh-accent)',
        'gh-border': 'var(--gh-border)',
        'gh-link': 'var(--gh-link)',
        'gh-green': 'var(--gh-green)',
        'gh-yellow': 'var(--gh-yellow)',
        'gh-red': 'var(--gh-red)',
      },
    },
  },
  plugins: [],
};
