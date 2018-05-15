require('dotenv').config();
const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function ifProd(ifYes, ifNo) {
  if (process.env.NODE_ENV === 'production') {
    return ifYes;
  }
  return ifNo;
}

module.exports = {
  mode: ifProd('production', 'development'),
  context: resolve('src'),
  entry: './bootstrap.js',
  output: {
    filename: 'bundle.js',
    path: resolve('dist'),
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new webpack.DefinePlugin({
      NASA_API_KEY: JSON.stringify(process.env.NASA_API_KEY),
    }),
  ],
};
