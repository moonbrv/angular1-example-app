'use strict'

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');

module.exports = {
  target: 'web',
  debug: true,
  devtool: 'eval-source-map',
  noInfo: true,

  resolve: {
    extensions: ['', '.js', '.json']
  },

  entry:
  {
    main: __dirname + '/src/js/index'
  },

  output: {
    path: __dirname + '/devbuild',
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle.js'
  },

  devServer: {
    contentBase: __dirname + '/src',
    colors: true,
    historyApiFallback: true
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],

    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      /* {
        test: /\.html$/,
        loader: 'resolve-url-loader!file-loader?name=[name].[ext]'
      },*/
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader?sourceMap!postcss-loader!resolve-url-loader!sass-loader?sourceMap'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['ng-annotate-loader', 'babel-loader']
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        include:/node_modules\/bootstrap-sass\/assets/,
        loader: 'file-loader?name=[1]&regExp=node_modules/bootstrap-sass/assets/(.*)'
      },
      {
        test: /\.(jpg|png|svg)$/,
        include: /src/,
        loader: 'file-loader?name=[1]&regExp=src/(.*)'
      }
    ]
  },

  postcss: [
    autoprefixer({
      browsers: [
      'last 2 versions'
      ]
    }),
    cssnano()
  ],

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      async: true
    }),
    /*new HtmlWebpackPlugin({
      template: __dirname + '/src/index.html',
      filename: __dirname + '/devbuild/index.html',
      inject: true
    }),*/
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: true
    }),
  ],
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}
