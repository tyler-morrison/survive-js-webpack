// External Dependencies
const path = require('path');

// Internal Dependencies
const pkg = require('./package.json'),
    parts = require('./libs/parts');

// Webpack Plugins
const merge = require('webpack-merge'),
    validate = require('webpack-validator'),
    HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
    app: path.join(__dirname, 'app'),
    style: [
        path.join(__dirname, 'node_modules', 'purecss'),
        path.join(__dirname, 'app', 'main.css')
    ],
    build: path.join(__dirname, 'build')
};

const common = {
    //Entry accepts a path or an object of entries.
    //We’ll be using the latter form given it’s convenient with more complex configurations.
    entry: {
        app: PATHS.app,
        style: PATHS.style
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

let config;

// Detect how NPM is run and branch bases on that env variable
switch (process.env.npm_lifecycle_event) {
    case 'build':
        config = merge(
            common, {
                devtool: 'source-map',
                output: {
                    path: PATHS.build,

                    // Tweak this to match your Github project name
                    publicPath: '/survive-js-webpack/'
                    filename: '[name].[chunkhash].js',
                    // This is used for require.ensure.
                    // The setup will work without but this is useful to set.
                    chunkFilename: '[chunkhash].js'
                }
            },
            parts.clean(PATHS.build),
            parts.setFreeVariable(
                'process.env.NODE_ENV',
                'production'
            ),
            parts.extractBundle({
                name: 'vendor',
                entries: Object.keys(pkg.dependencies)
            }),
            parts.minify(),
            parts.extractCSS(PATHS.style),
            parts.purifyCSS([PATHS.app])
        );
        break;
    default:
        config = merge(
            common, {
                devtool: 'eval-source-map',
            },
            parts.setupCSS(PATHS.style),
            parts.devServer({
                // Customize host/port here if needed
                host: process.env.HOST,
                port: process.env.PORT
            })
        );
}

// Adding webpack-validator to warn us of config issues
module.exports = validate(config, {
    quiet: true
});
