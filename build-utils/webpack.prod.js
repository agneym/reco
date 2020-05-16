const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const WorkboxPlugin = require("workbox-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WebpackPwaManifest = require('webpack-pwa-manifest');

const commonPaths = require("./commonPaths");

module.exports = {
  devtool: "source-map",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader"
        ],
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /(node_modules|dist|build-utils|webpack.config.js)/
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ManifestPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "production",
      DEBUG: false
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: commonPaths.public,
          to: commonPaths.outPublic,
          globOptions: {
            ignore: ["index.html"]
          }
        }
      ]
    }),
    new WebpackPwaManifest({
      name: 'Reco - Recording Studio',
      short_name: 'reco',
      description: 'In-Browser Recording Studio',
      background_color: '#ffffff',
      icons: [
        {
          src: path.resolve('public/icon.png'),
          sizes: [96, 128, 192, 256, 384, 512, 1024]
        },
      ]
    }),
  ]
};