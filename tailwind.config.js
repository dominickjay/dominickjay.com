/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './*.njk',
    './**/*.njk'
  ],
  darkMode: 'media',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '20px',
      },
      screens: {
        xs: '100%',
        sm: '100%',
        smw: '100%',
        md: '100%',
        mdw: '100%',
        lg: '1200px',
      },
    },
    screens: {
      smw: '640px',
      md: '768px',
      mdw: '1024px',
      lg: '1160px',
      xl: '1280px'
    },
    fontFamily: {
      heading: ['Infinity', 'sans-serif'],
      main: ['Infinity', 'sans-serif'],
    },

    colors: {
      transparent: 'rgba(255,255,255, 0)',
      current: 'currentColor',
      black: '#010f0a',
    },
  },
  extend: {
    utopia: (theme) => ({
      minScreen: theme('screens.smw'),
      maxScreen: theme('screens.xl'),
      maxScale: 1.5,
      textSizes: ['sm', 'base', 'lg', 'xl'],
    }),
  },
  plugins: [require('tailwind-utopia')],
}
