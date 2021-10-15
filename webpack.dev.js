const path = require("path");
const common =require("./webpack.common");
const {merge} = require("webpack-merge");
var HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: "development",

  output:{
    filename: "main.js",
    path: path.resolve(__dirname,"dist"),
    clean:true,
  },
  plugins: [ new MiniCssExtractPlugin(),new HtmlWebpackPlugin({
    title: 'Phoenix',
    template:"./src/template.html",
    inject:'body',
  }),

],
});
