/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#1c1c1c",
        third: "#ed1c24",
        bright: "#ffffff",
      },
      fontFamily: {
        "main-thin": ["axiformathin", "sans-serif"],
        "main-light": ["axiformalight", "sans-serif"],
        "main-regular": ["axiformaregular", "sans-serif"],
      },
      screens: {
        "md-custom": "48em", // ~768px
        "lg-custom": "62em", // ~992px
      }
    },
  },
  plugins: [],
}

