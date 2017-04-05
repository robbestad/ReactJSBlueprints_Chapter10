'use strict';

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    './source/index'
  ],
  output: {
    filename: "[name]-[hash:8].js",
    path: path.join(__dirname, "public"),
    publicPath: "/",
    chunkFilename: "[name]-[chunkhash].js"
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CopyWebpackPlugin(
      [
        {from: "assets", to: "./"}
      ],
      {ignore: ["**/*.css"]},
      {copyUnmodified: true}
    ),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      title: "A Wizard's Picnic",
      template: "index.hbs",
      inject: true,
      cache: false,
      appMountId: "root",
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        minifyJS: true,
        minifyCSS: true
      }
    })
  ],
  module: {
    noParse: /\.min\.js/,
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
        include: path.resolve('./source')
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  performance: {
    hints: false
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
}
