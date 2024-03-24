/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mainColor': '#32CD23'
      },
      fontFamily: {
        noto: ["Noto Sans Mono"]
      }
  
    }
  },
  plugins: [],
}