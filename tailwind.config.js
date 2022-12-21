/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#D1F0B1',
          '50': '#FFFFFF',
          '100': '#FFFFFF',
          '200': '#FFFFFF',
          '300': '#F9FDF5',
          '400': '#E5F7D3',
          '500': '#D1F0B1',
          '600': '#B5E782',
          '700': '#9ADE53',
          '800': '#7ED128',
          '900': '#61A21F',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
