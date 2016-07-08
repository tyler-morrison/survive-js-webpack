// External Dependencies
const path = require('path');

// Internal Dependencies
const parts = require('./libs/parts');

// Webpack Plugins
const merge = require('webpack-merge'),
    validate = require('webpack-validator'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'build')
};

const common = {
    //Entry accepts a path or an object of entries.
    //We’ll be using the latter form given it’s convenient with more complex configurations.
    entry: {
        app: PATHS.app
    },
    output: {
        path: PATHS.build,
        filename: '[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Webpack Demo'
        })
    ]
};

var config;

// Detect how NPM is run and branch bases on that env variable
switch (process.env.npm_lifecycle_event) {
    case 'build':
        config = merge(common, {})
        break;
    default:
        config = merge(
            common,
            parts.devServer({
                // Customize host/port here if needed
                host: process.env.HOST,
                port: process.env.PORT
            })
        );
}

// Adding webpack-validator to warn us of config issues
module.exports = validate(config);
