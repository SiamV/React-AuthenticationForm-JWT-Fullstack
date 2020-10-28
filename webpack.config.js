module.exports = {
  entry: __dirname + '/client/main.js',
  output: {
    path: __dirname + "/client/build/",
    filename: 'bundle.js'
  },
  devtool: false,
  mode: 'production',
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