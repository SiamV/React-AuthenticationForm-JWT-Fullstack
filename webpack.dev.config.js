module.exports = {
  entry: __dirname + '/client/main.js',
  output: {
    publicPath: '/client/js/',
    path: __dirname + "/client/js/",
    filename: 'bundle.js'
  },
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  devServer: {
    host: 'localhost',
    port: 8080,
    historyApiFallback: true,
    hot: true,
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
        use: [{ loader: 'react-hot-loader/webpack' },
        { loader: 'babel-loader' }
        ],
        exclude: /node_modules/
      },
    ]
  }
}
