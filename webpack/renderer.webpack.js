const path = require('path')

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  entry: ['./src/index.tsx'],
  module: {
    rules: require('./rules.webpack'),
  },
  output: {
    path: path.resolve(__dirname, '../app'),
    filename: 'bundle.js'
  }
}