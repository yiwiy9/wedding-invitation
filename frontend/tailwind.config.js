/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Noto Serif JP', ...defaultTheme.fontFamily.serif],
        italicSerif: ['Playfair Display', ...defaultTheme.fontFamily.serif],
      },
      backgroundImage: {
        texture: "url('/src/assets/texture.png')",
        countdown: "url('/src/assets/square-leaves.jpeg')",
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
