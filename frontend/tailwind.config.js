/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: false,
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        title: ["var(--font-cinzel)", "serif"],
        body: ["var(--font-rajdhani)", "sans-serif"],
      },

      colors: {
        primary: "#f29e0d",
        secondary: "#ce770d",
        cardbackground: "#1c1917",
        textmaincolor: "#cec5b5",
        textsubcolor: "#847869",
        background: "#110f0e",
        buttoncolor: "#f29e0d",
        admintext: "#c9184a",
        adminbackground: "#fcd5ce"
      },
    },
  },
  plugins: [],
}