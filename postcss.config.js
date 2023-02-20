const plugins = [
  require('postcss-import'),
  require('tailwindcss'),
  require('postcss-preset-env'),
  require('autoprefixer'),
]

if (process.env.NODE_ENV === 'production') {
  plugins.push(require('cssnano'))
}

module.exports = { plugins }