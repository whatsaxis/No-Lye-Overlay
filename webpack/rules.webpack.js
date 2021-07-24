module.exports = [
  {
    test: /\.node$/,
    use: 'node-loader',
  },
  /*
    I may of done a bit of an oopsie. Keep this just in case.
    https://www.npmjs.com/package/@marshallofsound/webpack-asset-relocator-loader

    EDIT: Turns out I uninstalled the wrong package. Oops.
    EDIT 2: Re-enabling this causes me an error. I'll just leave it for now.
  */
  // {
  //   test: /\.(m?js|node)$/,
  //   parser: { amd: false },
  //   use: {
  //     loader: '@marshallofsound/webpack-asset-relocator-loader',
  //     options: {
  //       outputAssetBase: 'native_modules',
  //     },
  //   },
  // },
  {
    test: /\.(js|ts|tsx)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader'
    }
  },
  {
    test: /\.(png|woff|woff2|eot|ttf|svg)$/,
    use: ['url-loader']
  }
]