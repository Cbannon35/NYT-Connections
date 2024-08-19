/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'karnak': ['Karnak', 'sans-serif'],
      },
      colors: {
        'word-bg': 'rgb(239, 239, 230)',
        'word-bg-selected': 'rgb(90, 89, 78)',
        'word-text': 'rgb(0, 0, 0)',
        'word-text-selected': 'rgb(255, 255, 255)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.no-scrollbar': {
          'scrollbar-width': 'none',
          '-ms-overflow-style': 'none',
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      };
      addUtilities(newUtilities);
    }
  ],
}
