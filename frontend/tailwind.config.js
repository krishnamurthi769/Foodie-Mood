/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        zomato: {
          red: '#E23744',
        },
        swiggy: {
          orange: '#FC8019',
        },
        instagram: {
          dark: '#000000',
          gray: '#262626',
          light: '#FAFAFA',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
