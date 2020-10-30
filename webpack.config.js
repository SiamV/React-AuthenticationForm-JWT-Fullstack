module.exports = {
  entry: __dirname + '/client/main.js',
  output: {
    path: __dirname + "/client/build/",
    filename: 'bundle.js'
  },
  mode: 'production',
  devtool: false,
  performance: {
    hints: 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' },
        { loader: 'css-loader' }
        ]
      },
      {
        test: /\.js$|jsx/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
    ]
  }
}