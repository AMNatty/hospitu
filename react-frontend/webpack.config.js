// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebPackPlugin = require("html-webpack-plugin");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
    resolve: {
        extensions: [ ".ts", ".tsx", ".js", ".jsx" ],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            },
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }]
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: "img/[hash]-[name].[ext]"
                    }
                }]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html",
            favicon: "./src/favicon.ico"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 9000
    }
};