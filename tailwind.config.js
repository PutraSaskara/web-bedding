/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#ee6c2b",
        "primary-dark": "#d65a1e",
        "background-light": "#f8f6f6",
        "background-dark": "#221610",
        "text-main": "#181311",
        "text-soft": "#896f61",
        "oatmeal": "#e8e1da",
        "sage": "#d0d9cd",
        "mustard": "#e8d8ae",
        "terracotta": "#e6bdaf",
      },
      fontFamily: {
        // Kita akan setup font Spline Sans di layout.js
        "display": ["var(--font-spline)", "sans-serif"],
        "body": ["var(--font-spline)", "sans-serif"],
      },
      borderRadius: {
        "lg": "1rem",
        "xl": "1.5rem",
        "2xl": "2rem",
      },
      boxShadow: {
        "soft": "0 10px 40px -10px rgba(0,0,0,0.08)",
        "float": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      }
    },
  },
  plugins: [
  require('@tailwindcss/typography'),
  // ... plugin lain
],
};