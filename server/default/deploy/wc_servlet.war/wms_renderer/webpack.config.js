var webpack = require('webpack');
var path = require('path');

var src_dir = 'src';

module.exports = {
    context: path.join(__dirname, src_dir),
    entry: {
        app: './App',
        //bundle: './index'
    },
    output: {
        path: path.join(__dirname, '/js/'),
        filename: '[name].js'
    },
    resolve: {
        root: path.resolve(__dirname, src_dir),
        extensions: ['', '.js', '.jsx']
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                query: {
                    presets: ['es2015','react'],
                    plugins: [
                        "transform-decorators-legacy",
                        "transform-class-properties"
                    ]
                },
                include: path.join(__dirname, src_dir)
            }
        ]
    },
    //watch: true,
    devtool: 'eval',
    plugins: [
        //new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};