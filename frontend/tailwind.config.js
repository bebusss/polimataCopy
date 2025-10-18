/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'polimata-dark': '#0A0E28',
        'polimata-darker': '#050716',
        'polimata-blue': '#3A6EF2',
        'polimata-green': '#47CC88',
      },
    },
  },
  plugins: [],
}
