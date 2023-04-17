/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/react-tailwindcss-datepicker/dist/index.esm.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'primary-orange': '#FF4800',
        'dark-surface': '#121212',
        'dark-orange': '#FF5A19',
        'dark-green': '#62BA52',
        'dark-red': '#D13636',
        'dark-blue': '#5169A4',
        'accent-green': '#3CAA2A',
        'accent-red': '#C60707',
        'accent-blue': '#2E7CF6',
      },
      maxWidth: {
        wide: '1920px',
      },
      height: {
        5.5: '1.375rem',
        6.5: '1.625rem',
        9.5: '2.375rem',
      },
      lineHeight: {
        4.5: '1.125rem',
      },
    },
  },
  plugins: [],
};
