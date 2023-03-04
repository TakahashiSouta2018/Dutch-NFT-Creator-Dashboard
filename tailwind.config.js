/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ['Satoshi', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#FF4800',
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
