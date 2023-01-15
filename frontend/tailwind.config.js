/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'blue': '#1BA2A1',
      'green': '#D6DF27',
      'greenHover': '#c3e200'
      },
      spacing: {
        "one": "0.5rem",
        "two": '1rem'
      }
    },
  },
  plugins: [],
}
