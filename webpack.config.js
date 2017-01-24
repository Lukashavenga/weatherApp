var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'src/client/public/');
var APP_DIR = path.resolve(__dirname, 'src/client/');

var config = {
    contentBase: './src/client',
    devtool: 'cheap-module-source-map',
    entry :[
        // 'webpack/hot/dev-server',
        path.resolve(APP_DIR, 'main.js')
    ]
    ,
    output: {
        path: BUILD_DIR,
        publicPath: '/public/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'stage-2', 'react']
                }
            }
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env':{
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings: true
            }
        })
    ]
};

module.exports = config;
