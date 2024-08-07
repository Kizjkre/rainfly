// noinspection JSUnusedGlobalSymbols
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        secondary: '#FFFBD3'
      },
      fontFamily: {
        sans: ['"Outfit"', 'sans-serif']
      },
      gridTemplateRows: {
        main: '3rem 4fr 6fr'
      }
    }
  },
  plugins: []
};

