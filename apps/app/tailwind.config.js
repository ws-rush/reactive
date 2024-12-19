/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './app/**/*.{js,ts,jsx,tsx}'],
  // Enable dark mode using the 'class' strategy
  darkMode: 'class',
  plugins: [import('@tailwindcss/typography')],
  theme: {
    extend: {
      // Define your custom font families
      fontFamily: {
        sans: ['Lato', 'sans-serif'],
        serif: ['Lato', 'serif'],
      },
    },
  },
}
