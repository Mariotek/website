const webpack = require('webpack');
const dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');


module.exports = {
    entry: {
        site: './src/index.js'
    },
    module: {
        rules: [
            {
                test   : /\.(js|jsx)$/,
                exclude: /node_modules/,
                use    : ['babel-loader']
            },


            // STYLES
            {
                test: /\.css$/,
                use : [
                    'style-loader',
                    {
                        loader : 'css-loader',
                        options: {
                            sourceMap: IS_DEV
                        }
                    }
                ]
            },


            // IMAGES
            {
                test   : /\.(jpe?g|png|gif)$/,
                loader : 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            },

            /**
             * Load font files
             */
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                use : ['url-loader?limit=100000']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path      : `${__dirname}/dist`,
        publicPath: '/',
        filename  : '[name]_bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CopyWebpackPlugin([
            { from: `${__dirname}/www/`, to: './' }
        ]),
        new dotenv()
    ],
    devServer: {
        contentBase       : './dist',
        historyApiFallback: true,
        hot               : true
    }
};
