/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "../../packages/badges/src/**/*.{js,ts,jsx,tsx}"
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
}; 