const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.[chunghash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new HTMLWebpackPlugin({
            filename: 'sign-in.html',
            template: './src/components/sign_in/sign-in.html'
        }),
        new HTMLWebpackPlugin({
            filename: 'sign-up.html',
            template: './src/components/sign_up/sign-up.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.(jpg|png|svg|gif)/,
                use: ['file-loader']
            }
        ]
    },
    devServer: {
        port: 4200
    }
}
