const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  mode: "development",
  entry: ['@babel/polyfill', './src/index.js'],
  output:{
    filename: "main.[contenthash].js",
    path: path.resolve(__dirname,"dist"),
    clean:true,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader, options: { publicPath: "" } },
          "css-loader",
          "sass-loader",
        ],
      },

      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin({filename: "main.[contenthash].css"}), new HtmlWebpackPlugin({
    title: 'Phoenix',
    template:"./src/template.html",
    inject:'body',
  }),
new CleanWebpackPlugin(),
],
  resolve: {
    extensions: [".js", ",jsx"],
  },
  devtool: "source-map",
  devServer: {
    static: "./dist",
    hot: true,
  },
};
