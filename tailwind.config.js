/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Crucial for our manual theme toggle
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7C5DFA',
          light: '#9277FF',
        },
        navy: {
          DEFAULT: '#1E2139',
          dark: '#252945',
          darker: '#141625', // Sidebar in dark mode
        },
        gray: {
          light: '#F8F8FB', // Light mode background
          border: '#DFE3FA',
          cool: '#888EB0',
          blueish: '#7E88C3',
        },
        dark: {
          DEFAULT: '#0C0E16', // Main text in light mode
        },
        danger: {
          DEFAULT: '#EC5757',
          light: '#FF9797',
        }
      },
      fontFamily: {
        spartan: ['League Spartan', 'sans-serif'],
      }
    },
  },
  plugins: [],
}