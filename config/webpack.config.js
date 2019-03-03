const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
    entry: {
        server: './src/index.js',
    },
    output: {
        path: path.join(__dirname, '../build'),
        publicPath: '/',
        filename: '[name].js',
        libraryExport: 'default',
    },
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    externals: [
        nodeExternals(),
    ],
    plugins: [
        new NodemonPlugin({
            args: ['--inspect --config ./config/nodemon.json'],
            nodeArgs: ['--inspect'],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
};
