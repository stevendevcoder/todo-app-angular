/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        background: "#121215",
        primary: "#18181c",
        secondary: "#724af3",
        textC: "#c1c1c9",
        textCHover: "#e4e4ed",
        cards: "#2f2d36",
      },
    },
  },
  plugins: [],
};
