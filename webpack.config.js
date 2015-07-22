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
      //{
        //test: /\.js$/,
        //include: path.join(__dirname, 'src/streams'),
        //loaders: [
        //'imports?$=>new Rx.Subject(),Obs=>Rx.Observable',
        //
        //]
      //},
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loaders: [
          'imports?Obs=>Rx.Observable',
        ]
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new webpack.ProvidePlugin({
      Rx: 'rx'
    }),
  ],
  resolveLoader: {
    modulesDirectories: ['loaders', 'node_modules'],
  },
  resolve: {
    root: path.join(__dirname, 'src')
  },
};

