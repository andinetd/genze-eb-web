/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "serif"],
        body: ["var(--font-body)", "ui-sans", "sans-serif"],
      },
      colors: {
        black: "#0a0a0a",
        white: "#ffffff",
        gray: {
          50: "#f9f9f9",
          100: "#f2f2f2",
          200: "#e5e5e5",
          400: "#999",
          600: "#555",
        },
        accent: "#1a1a1a",
        green: "#22c55e",
        "green-soft": "#dcfce7",
      },
    },
  },
  plugins: [],
};