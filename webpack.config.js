// const path = require('path')
// const { WebpackManifestPlugin } = require('webpack-manifest-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// const isDev = process.env.NODE_ENV === 'development'

// const baseFilename = isDev ? 'main' : 'main.[contenthash]'

// module.exports = {
//   mode: isDev ? 'development' : 'production',
//   entry: [
//     path.resolve(__dirname, 'src/css', 'main.css'),
//   ],
//   output: {
//     path: path.resolve(__dirname, '_site', 'assets'),
//     filename: `${baseFilename}.js`,
//   },
//   module: {
//     rules: [
//       {
//         test: /\.m?js$/,
//         exclude: /(node_modules)/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env'],
//           },
//         },
//       },
//       {
//         test: /\.css$/,
//         use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
//       },
//       {
//         test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
//         use: [
//           {
//             loader: 'file-loader',
//             options: {
//               name: '[name].[ext]',
//               outputPath: 'fonts/',
//             },
//           },
//         ],
//       },
//     ],
//   },
//   devtool: isDev ? 'eval' : 'source-map',
//   plugins: [
//     new MiniCssExtractPlugin({ filename: `${baseFilename}.css` }),
//     new WebpackManifestPlugin({ publicPath: '/assets/' }),
//   ],
// }
