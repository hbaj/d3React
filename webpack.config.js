const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(s[ac]|c)ss$/i,
                use: 
                [{loader:MiniCssExtractPlugin.loader,
                options:{publicPath:""},},
                "css-loader",
                 "sass-loader"],
    },
    
    {
    test: /\.jsx?$/,
        exclude: /node_modules/,
            use: {
        loader: "babel-loader",
        }
}
]
    },
plugins: [new MiniCssExtractPlugin()],
    resolve: {
    extensions: [".js", ",jsx"]
},
devtool: "source-map",
    devServer: {
    static: "./dist",
        hot: true,
    },
}