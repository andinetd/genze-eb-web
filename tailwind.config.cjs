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
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        ink: "#111111",
        muted: "#6b7280",
        canvas: "#ffffff",
        card: "#f5f5f5",
        line: "#ececec",
        accent: "#e65100",
        "accent-green": "#15803d",
      },
    },
  },
  plugins: [],
};