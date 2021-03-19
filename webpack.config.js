const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/js/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname , 'dist'),
    },
    devtool: 'source-map',
    devServer: {
        port: 5000
    },

    module: {
        rules: [
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
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'less-loader' },
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    { loader: 'url-loader' },
                    { loader: 'img-loader' }
                ]
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/pug/index.pug'
        })
    ]
}