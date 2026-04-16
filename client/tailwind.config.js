/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: '#0f1115', // Main Background
          800: '#1a1d24', // Sidebar & Cards
          700: '#2c313c', // Hover & Borders
        },
        brand: {
          500: '#6366f1', // Primary Indigo Accent
          400: '#818cf8', // Hover Indigo
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Modern font
      }
    },
  },
  plugins: [],
}
