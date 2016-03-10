var webpack = require('webpack');

module.exports = {
    entry: './src/index',
    output: {
        path: './dist',
        filename: 'riot-ui.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({minimize: true})
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.styl$/,
            exclude: /node_modules/,
            loaders: ['style-loader', 'css-loader', 'stylus-loader']
        }, {
            test: /\.tag$/,
            exclude: /node_modules/,
            loaders: ['babel-loader', 'riotjs-loader']

        }]
    },
    devServer: {
        contentBase: './public'
    }
};