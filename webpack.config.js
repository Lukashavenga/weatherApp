var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public/');
var APP_DIR = path.resolve(__dirname, 'src/client/');

var config = {
    context: APP_DIR,
    devtool: 'eval-source-map',
    entry :[
        path.resolve(APP_DIR, 'main.js')
    ]
    ,
    output: {
        path: BUILD_DIR,
        publicPath: './public/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                loader: "style-loader!css-loader?sourceMap&localIdentName=[local]--[hash:base64:5]!sass-loader",
            }, {
                test: /\.(jpg|png|gif)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins:[
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            mangle: {
                screw_ie8: true,
                keep_fnames: true
            },
            compress: {
                screw_ie8: true
            },
            comments: false
        })
    ]
};

module.exports = config;
