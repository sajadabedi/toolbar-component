/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        elevated:
          '0 0 0 1px rgb(0 0 0 / 0.05), 0 4px 8px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        elevatedDark:
          '0 0 0 1px rgb(255 255 255 / 0.2), 0 4px 8px -1px rgb(0 0 0 / 0.2), 0 2px 4px -2px rgb(0 0 0 / 0.2)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
