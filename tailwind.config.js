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
        'nav': '#49914b',
        'bg': '#edf7ee',
        'text-light': '#ffffff',
        'text-dark': '#364c6b',
      },
      fontFamily: {
        title: ['Noto Sans Mono', 'Ubuntu Mono', 'DM Mono', 'Sono', 'Rubik Mono One',],
        body: ['Noto Sans Mono', 'Ubuntu Mono', 'DM Mono', 'Sono',],
      },
    },
  },
  plugins: [],
}

