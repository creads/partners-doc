const path = require('path');
// const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const styleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './assets/main.js',
  output: {
    path: path.resolve(__dirname, 'docs/')
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          "css-loader",
          // "postcss-loader",
          "sass-loader",
        ],
        resolve: {
          mainFields: ['sass', 'style', 'main']
        }
      },
      { test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
    // new CopyWebpackPlugin([
    //   { from: path.resolve(__dirname, 'dist/*.css'), to: path.resolve(__dirname, '_site/assets/css/[name].[ext]'), toType: 'template' },
    //   { from: path.resolve(__dirname, 'dist/*.js'), to: path.resolve(__dirname, '_site/assets/js/[name].[ext]'), toType: 'template' },
    //   { from: path.resolve(__dirname, 'src/scss'), to: path.resolve(__dirname, 'dist/scss/[path]/[name].[ext]'), toType: 'template' },
    //   { from: path.resolve(__dirname, 'src/assets'), to: path.resolve(__dirname, 'dist/assets/[path]/[name].[ext]'), toType: 'template' }
    // ]),
    // new styleLintPlugin({
    //   configFile: '.stylelintrc',
    //   context: '',
    //   files: ['src/scss/**/*.scss'],
    //   failOnError: false,
    //   quiet: false,
    // })
  ]
};
