/** @type {import('tailwindcss').Config} */
// Colours are semantic tokens backed by CSS variables (src/index.css), so one
// class works in both themes. Values are RGB channels to keep /opacity modifiers.
const token = (name) => `rgb(var(--c-${name}) / <alpha-value>)`

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./scripts/**/*.mjs",
  ],
  theme: {
    extend: {
      colors: {
        page: token('page'),
        surface: token('surface'),
        fg: token('fg'),
        muted: token('muted'),
        accent: token('accent'),
        'accent-hover': token('accent-hover'),
        line: token('line'),
      },
    },
  },
  plugins: [],
}
