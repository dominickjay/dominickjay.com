/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    '_site/**/*.html',
    '_site/assets/*.{css,scss,js}',
    '_site/assets/**/*.{css,scss,js}'
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
      orange: '#E78F67',
    },
  },
  extend: {
    utopia: (theme) => ({
      minScreen: theme('screens.sm'),
      maxScreen: theme('screens.xl'),
      maxScale: 1.5,
      textSizes: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'],
    }),
  },
  plugins: [require('tailwind-utopia')],
}
