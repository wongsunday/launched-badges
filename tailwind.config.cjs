/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./packages/*/src/**/*.{js,jsx,ts,tsx}",
    "./examples/*/src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        lovable: {
          primary: '#ff385c',
          secondary: '#ff5b79',
          dark: '#c62b4a',
          light: '#ffd9e0',
        }
      }
    },
  },
  plugins: [],
} 