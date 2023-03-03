/* © Andy Bell - https://buildexcellentwebsit.es/ */

const plugin = require('tailwindcss/plugin');
const postcss = require('postcss');
const postcssJs = require('postcss-js');

const clampGenerator = require('./src/assets/css-utils/clamp-generator.js');
const tokensToTailwind = require('./src/assets/css-utils/tokens-to-tailwind.js');

// Raw design tokens
const colorTokens = require('./src/assets/design-tokens/colors.json');
const fontTokens = require('./src/assets/design-tokens/fonts.json');
const spacingTokens = require('./src/assets/design-tokens/spacing.json');
const textSizeTokens = require('./src/assets/design-tokens/text-sizes.json');

// Process design tokens
const colors = tokensToTailwind(colorTokens.items);
const fontFamily = tokensToTailwind(fontTokens.items);
const fontSize = tokensToTailwind(clampGenerator(textSizeTokens.items));
const spacing = tokensToTailwind(clampGenerator(spacingTokens.items));

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
    },
    colors,
    spacing,
    fontSize,
    fontFamily,
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      black: 800
    },
    backgroundColor: ({theme}) => theme('colors'),
    textColor: ({theme}) => theme('colors'),
    margin: ({theme}) => ({
      auto: 'auto',
      ...theme('spacing')
    }),
    padding: ({theme}) => theme('spacing')
  },
  extend: {
    utopia: (theme) => ({
      minScreen: theme('screens.sm'),
      maxScreen: theme('screens.xl'),
      maxScale: 1.5,
      textSizes: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl'],
    }),
  },
  // Disables Tailwind's reset etc
  corePlugins: {
    preflight: false
  },
  plugins: [
    require('tailwind-utopia'),
    // Generates custom property values from tailwind config
    plugin(function ({addComponents, config}) {
      let result = '';

      const currentConfig = config();

      const groups = [
        {key: 'colors', prefix: 'color'},
        {key: 'spacing', prefix: 'space'},
        {key: 'fontSize', prefix: 'size'},
        {key: 'fontFamily', prefix: 'font'}
      ];

      groups.forEach(({key, prefix}) => {
        const group = currentConfig.theme[key];

        if (!group) {
          return;
        }

        Object.keys(group).forEach(key => {
          result += `--${prefix}-${key}: ${group[key]};`;
        });
      });

      addComponents({
        ':root': postcssJs.objectify(postcss.parse(result))
      });
    }),

    // Generates custom utility classes
    plugin(function ({addUtilities, config}) {
      const currentConfig = config();
      const customUtilities = [
        {key: 'spacing', prefix: 'flow-space', property: '--flow-space'},
        {key: 'colors', prefix: 'spot-color', property: '--spot-color'}
      ];

      customUtilities.forEach(({key, prefix, property}) => {
        const group = currentConfig.theme[key];

        if (!group) {
          return;
        }

        Object.keys(group).forEach(key => {
          addUtilities({
            [`.${prefix}-${key}`]: postcssJs.objectify(
              postcss.parse(`${property}: ${group[key]}`)
            )
          });
        });
      });
    })
  ],
}
