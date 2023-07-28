const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const isProd = process.env.NODE_ENV === "production"

module.exports = {
  devtool: 'eval',
  entry: [
    "webpack/hot/only-dev-server",
    'webpack-hot-middleware/client',
    'react-hot-loader/patch',
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
    new webpack.NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin(
      [
        {from: "assets", to: "./"}
      ],
      {ignore: ["**/*.css"]},
      {copyUnmodified: isProd}
    ),
    new HtmlWebpackPlugin({
      title: 'Wizrds',
      template: "index.hbs",
      env: "development",
      version: require(path.join(__dirname, 'package.json')).version,
      inject: true,
      cache: false,
      appMountId: "root",
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
        conservativeCollapse: isProd,
        minifyJS: isProd,
        minifyCSS: isProd
      }
    })
  ],
  module: {
    noParse: /\.min\.js/,
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: path.resolve('./source'),
        query: {
          presets: [
            "react",
            "es2015"
          ],
          plugins: [
            "react-hot-loader/babel",
            "transform-flow-strip-types",
            [
              "react-transform",
              {
                transforms: [
                  {
                    "transform": "react-transform-hmr",
                    "imports": [
                      "react"
                    ],
                    "locals": [
                      "module"
                    ]
                  },
                  {
                    "transform": "react-transform-catch-errors",
                    "imports": [
                      "react",
                      "redbox-react"
                    ]
                  }
                ]
              }
            ]
          ]
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader']
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
