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
      xs: '375px',
      sm: '480px',
      smw: '640px',
      md: '768px',
      mdw: '1024px',
      lg: '1160px',
      xl: '1280px',
      xxl: '1450px'
    },
    fontFamily: {
      heading: ['Erode', 'serif'],
      main: ['Recia', 'serif'],
    },

    colors: {
      transparent: 'rgba(255,255,255, 0)',
      current: 'currentColor',
      black: '#010f0a',
      white: '#ffffff',
      grey: '#bfc3ca',
      red: '#e63946',
      orange: '#ff5f1f',
      green: '#0ba95b',
      pink: '#f38ba3'
    },
  },
  extend: {
    boxShadow: {
      "circles": ['inset 0 0 45px rgba(55, 74, 170, 0), inset 0 0 44px rgba(255, 255, 255, 0), 10px 10px 30px rgba(55, 84, 170, 0.15), -5px -5px 22px white, inset 0px 0px 17px rgba(255, 255, 255, 0.5)'],
    },
    utopia: (theme) => ({
      minScreen: theme('screens.sm'),
      maxScreen: theme('screens.xl'),
      maxScale: 1.5,
      textSizes: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'],
    }),
  },
  plugins: [require('tailwind-utopia')],
}
