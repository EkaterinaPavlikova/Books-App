const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    entry: ['babel-polyfill', 'whatwg-fetch', './ClientApp/src/main.jsx'],
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'wwwroot', 'dist'),
        publicPath: '/dist'
    },

    resolve: {
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [{
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader",
                    "eslint-loader"
                ]
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    "babel-loader",
                    "eslint-loader"
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [require('autoprefixer')]
                    }
                }]
            },
            {
                test: /\.scss/,
                use: ['style-loader', 'css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [require('autoprefixer')]
                    }
                }, 'sass-loader']
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist'])

    ],

    watch: true,
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname, 'wwwroot'),
        port: 3000,
        proxy: {
            "/api": {
                target: "http://localhost:5000",
            },
        },
    }
}



// const developmentConfig = {
//     watch: true,
//     devtool: "source-map",
//     devServer: {
//         contentBase: path.resolve(__dirname, 'wwwroot'),
//         port: 3000,
//         proxy: {
//             "/api": {
//                 target: "http://localhost:5000",
//             },
//         },
//     },

// }

// module.exports = (env, argv) => {
//     if (argv.mode === 'production') {
//         return common;
//     }
//     if (argv.mode === 'development') {
//         return Object.assign({},
//             common,
//             developmentConfig
//         );
//     }
// }