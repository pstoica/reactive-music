var path = require('path');

module.exports = {
  devtool: 'eval',
  entry: {
    main: './src/main.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader?stage=0&optional=runtime',
        exclude: /node_modules/
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  resolve: {
  }
};

