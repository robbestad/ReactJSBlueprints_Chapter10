var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './source/index'
  ],
  output: {
    filename: "[name]-[hash:8].js",
    path: path.join(__dirname, "build"),
    publicPath: "/",
    chunkFilename: "[name]-[chunkhash].js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.LoaderOptionsPlugin({
    //   minimize: true,
    //   debug: false
    // }),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'NODE_ENV': JSON.stringify('production')
    //   }
    // }),
    new HtmlWebpackPlugin({
      title: "A Wizard's Picnic",
      template: 'index.ejs',
      hash: true,
      inject: 'body'
    }),
    new CopyWebpackPlugin([
        {from: "assets", to: "./assets"}],
      {copyUnmodified: true})
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          'presets': ['es2015', 'react'],
          'env': {
            'development': {
              'presets': ['react-hmre'],
              'plugins': ['transform-flow-strip-types'],
            }
          }
        },
        include: path.join(__dirname, 'source')
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};

