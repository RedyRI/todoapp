const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: './src/js/index.js',
    output: {
        path: path.resolve(__dirname , 'dist'),
        filename: 'js/main.js',
        assetModuleFilename: 'static/[name][ext][query]',
    },
    devtool: 'source-map',

    devServer: {
        port: 5000,
    },

    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset/resource",
                // parser: {
                //     dataUrlCondition: {
                //         maxSize: 30 * 1024,
                //     },
                // },
            },
            {
                test: /\.pug$/,
                use:[
                    {
                        loader: 'pug-loader'
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: "../",
                        } 
                    },
                    { loader: 'css-loader' },
                    { loader: 'less-loader'},
                ]
            },            

        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.pug',
            // minify: {
            //     html5: true,
            //     collapseWhitespace: true,
            //     caseSensitive: true,
            //     removeComments: true,
            //     removeEmptyElements: true
            // }
        }),
        new MiniCssExtractPlugin({
            filename: "./css/[name]-styles.css",
            chunkFilename: "[id].css"
        })
    ]
}