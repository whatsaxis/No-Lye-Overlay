const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.ts', '.js']
  },
  entry: './electron/main.ts',
  module: {
    rules: require('./rules.webpack')
  },
  plugins: [
    new CopyWebpackPlugin(
      { 
        patterns: [
          {
            from: path.join(__dirname, '../assets/'),
            to: path.resolve(__dirname, '.webpack/renderer/assets/')
          }
        ]
      }
    )
  ]
}