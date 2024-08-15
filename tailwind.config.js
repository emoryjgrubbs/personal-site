/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        'nav': '#364c6b',
        'bg': '#c5d5eb',
        'text-light': '#c5d5eb',
        'text-dark': '#364c6b',
      },
    },
  },
  plugins: [],
}

