

const path = require('path');
// const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackShellPlugin = require('webpack-shell-plugin');
const WatchFilesPlugin = require('webpack-watch-files-plugin').default;

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
    }),
    new WebpackShellPlugin({
      onBuildExit: ['echo "Building with metalsmith"', 'node build.js']
    }),
    new WatchFilesPlugin({
      files: [
        './templates/**/*.nunjucks'
      ],
      verbose: true
    })
  ]
};
