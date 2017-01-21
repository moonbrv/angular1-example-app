'use strict'

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const autoprefixer = require('autoprefixer')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const Purify = require('purifycss-webpack-plugin')
const cssnano = require('cssnano')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  target: 'web',
  debug: true,
  devtool: 'source-map',
  noInfo: true,

  resolve: {
    extensions: ['', '.js', '.json']
  },

  entry:
  {
    vendor: ['angular', 'angular-ui-router', 'angular-messages'],
    main: path.join(__dirname, '/src/js/index.js')
  },

  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: './',
    filename: '[name].bundle-[hash:6].js',
    chunkFilename: '[id].bundle-[hash:6].js'
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
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader!resolve-url-loader!sass-loader?sourceMap')
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['ng-annotate-loader', 'babel-loader']
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        include:/node_modules\/bootstrap-sass\/assets/,
        loader: 'file-loader?name=[1]&regExp=node_modules/bootstrap-sass/assets/fonts/bootstrap(.*)'
      },
      {
        test: /\.(jpg|png|svg|ico)$/,
        include: /src/,
        loaders: [
          'file-loader?name=[1]&regExp=src/(.*)',
          'image-webpack'
          ]
      }
    ]
  },

  imageWebpackLoader: {
    mozjpeg: {
      quality: 65
    },
    pngquant:{
      quality: '65-90',
      speed: 4
    },
    svgo:{
      plugins: [
        {
          removeViewBox: false
        },
        {
          removeEmptyAttrs: false
        }
      ]
    }
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
    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunk: Infinity
    }),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        sequences: true,
        booleans: true,
        loops: true,
        unused: true,
        warnings: false,
        drop_console: true,
        unsafe: false
      }
    }),
    new StyleLintPlugin({
      syntax: 'scss',
      files: './src/**/*.scss'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/index.html'),
      favicon: path.join(__dirname, '/src/favicon.ico')
    }),
    new ExtractTextPlugin(
      'style-[hash:6].css'
    ),
    new Purify({
      basePath: __dirname,
      paths: [
        './src/**/*.html',
        './src/js/**/*.js'
      ],
      resolveExtensions: ['.html', '.js'],
      purifyOptions: {
        minify: true,
        info: true
      }
    })
  ]
}
