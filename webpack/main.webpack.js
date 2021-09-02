const path = require('path')

let options = 

module.exports = [
  {
    resolve: {
      extensions: ['.ts', '.js']
    },
    entry: './electron/main.ts',
    module: {
      rules: require('./rules.webpack')
    },
    output: {
      path: path.resolve(__dirname, '../app'),
      filename: 'main.js'
    },
    target: 'electron-main'
  },
  {
    resolve: {
      extensions: ['.ts']
    },
    entry: ['./electron/bridge.ts'],
    module: {
      rules: require('./rules.webpack'),
    },
    output: {
      path: path.resolve(__dirname, '../app'),
      filename: 'bridge.js'
    },
    target: 'electron-preload'
  }
]