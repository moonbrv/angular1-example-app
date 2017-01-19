'use strict'

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin');
const autoprefixer = require('autoprefixer')
const path = require('path')

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
    main: path.join(__dirname, '/src/js/index.js')
  },

  output: {
    path: path.join(__dirname, '/devbuild'),
    publicPath: '/',
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle.js'
  },

  devServer: {
    contentBase: path.join(__dirname, '/src'),
    historyApiFallback: true,
    stats: {
      colors: true,
      chunks: false,
      reasons: true
    }
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
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
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
        loader: 'url-loader?limit=120000'
      },
      {
        test: /\.(jpg|png|svg|ico)$/,
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
    })
  ],

  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    }),
    new StyleLintPlugin({
      syntax: 'scss',
      files: './src/**/*.scss'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/index.html')
    }),
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV === 'development',
      __TEST__: process.env.NODE_ENV === 'test'
    })
  ]
}
