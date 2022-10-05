const path = require('path')

module.exports = {
  entry: '/js/index.js',
  output: {
    path: path.resolve(__dirname, '_site/js'),
    filename: 'index.js',
  },
}
