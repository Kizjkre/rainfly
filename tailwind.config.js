// noinspection JSUnusedGlobalSymbols
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#94E170',
        secondary: '#FFFBD3',
        accent: '#FD9494'
      },
      fontFamily: {
        sans: ['"Outfit"', 'sans-serif']
      },
      gridTemplateRows: {
        main: '3rem 5fr 5fr 1.75rem 1.75rem'
      }
    }
  },
  plugins: []
};

