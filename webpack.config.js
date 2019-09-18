const path = require('path')
const HtmlWeapackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  entry: './src/mvvm.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWeapackPlugin({
      template: './index.html'
    })
  ]
}