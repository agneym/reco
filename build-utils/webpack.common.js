const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");

const commonPaths = require("./commonPaths");

const config = {
  output: {
    filename: "[hash].bundle.js",
    path: commonPaths.outputPath,
    publicPath: "/"
  },
  resolve: {
    extensions: [".js"],
    alias: {
      "react": "preact/compat", 
      "react-dom": "preact/compat"
    }
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif|eot|ttf|woff|woff2)$/i,
        use: [
          {
            loader: "file-loader",
          }
        ]
      },
      {
        test: /\.svg$/i,
        use: '@svgr/webpack'
      },
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new htmlWebpackPlugin({
      template: "public/index.html"
    })
  ]
};

module.exports = config;