/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        transparent: "transparent",
        current: "currentColor",
        blue: {
          design: "#1BA2A1",
        },
        green: {
          design: "#D6DF27",
          "design-hover": "#c3e200",
        },
      },
      spacing: {
        one: "0.5rem",
        two: "1rem",
      },
    },
  },
  plugins: [],
}
