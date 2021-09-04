const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports ={
    mode: "development",
    module:{
rules:[
    {
test:/\.(s[ac]|c)ss$/i,
use:[MiniCssExtractPlugin.loader,"css-loader","sass-loader"],
    },
    
    {
        test: /\.jsx?$/,
        exclude:/node_modules/,
        use:{
            loader: "babel-loader",
        }
    }
]
    },
    plugins:[new MiniCssExtractPlugin()],
    resolve:{
        extensions: [".js", ",jsx"]
    },
    devtool: "source-map",
    devServer: {
        static: "./dist",
        hot:true,
    },
}