/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');
const config = require('./src/assets/tokens/tailwind-config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  mode: 'jit',
  purge: ['./src/**/*.@(tsx|mdx)'],
  ...config,
  theme: {
    extend: {
      fontFamily: {
        primary: ['Inter', ...fontFamily.sans],
      },
      ...config.theme.extend,
      inset: { '0': '0' },
      padding: { '0': '0' }
    },
  },
};
