/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'word-bg': 'rgb(239, 239, 230)',
        'word-bg-selected': 'rgb(90, 89, 78)',
        'word-text': 'rgb(0, 0, 0)',
        'word-text-selected': 'rgb(255, 255, 255)',
      },
    },
  },
  plugins: [],
}
