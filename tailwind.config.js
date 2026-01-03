/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily:{
        avant:[
          "ITC Avant Garde",
          "Avant Garde",
          "Avantgarde",
          "Century Gothic",
          "CenturyGothic",
          "AppleGothic",
          "sans-serif",
        ]
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        fadeIn: 'fadeIn 800ms ease-in forwards',
      }
    },
  },
  plugins: [],
}

