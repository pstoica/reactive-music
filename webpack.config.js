var webpack = require('webpack');
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
      },
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src/streams'),
        loaders: [
          'exports?$',
          'imports?$=>new Rx.Subject()',
        ]
      },
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      Rx: 'rx',
      scheduler: path.join(__dirname, 'src/scheduler.js'),
      U: path.join(__dirname, 'src/utils/index.js'),
      '$a': path.join(__dirname, 'src/streams/a.js'),
      '$b': path.join(__dirname, 'src/streams/b.js'),
      '$c': path.join(__dirname, 'src/streams/c.js'),
      '$d': path.join(__dirname, 'src/streams/d.js'),
      '$e': path.join(__dirname, 'src/streams/e.js'),
      '$f': path.join(__dirname, 'src/streams/f.js'),
      '$g': path.join(__dirname, 'src/streams/g.js'),
      '$h': path.join(__dirname, 'src/streams/h.js'),
      '$i': path.join(__dirname, 'src/streams/i.js'),
      '$j': path.join(__dirname, 'src/streams/j.js'),
    }),
  ],
  resolveLoader: {
    modulesDirectories: ['loaders', 'node_modules'],
  },
  resolve: {
  },
};

