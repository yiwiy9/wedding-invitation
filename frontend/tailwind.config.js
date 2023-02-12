/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Noto Serif JP', ...defaultTheme.fontFamily.serif],
      },
      keyframes: {
        zoomUp: {
          to: { transform: 'scale(1.15)' },
        },
      },
      animation: {
        zoomUp: 'zoomUp 10s linear 0s 1 normal both',
      },
    },
  },
  plugins: [],
}
