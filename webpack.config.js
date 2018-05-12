const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function ifProd(ifYes, ifNo) {
    if(process.env.NODE_ENV === 'production') {
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
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './index.html'
            })
        ]
};