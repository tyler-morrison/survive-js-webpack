const webpack = require('webpack');

exports.devServer = (options) => {
    return {
        devServer: {
            // Enable history API fallback so HTML5 History API based routing works.
            // This is a good default that will come in handy for more complicated setups.
            historyApiFallback: true,

            // Unlike the CLI flag, the following does NOT set HotModuleReplacementPlugin
            hot: true,
            inline: true,

            // Display only errors to reduce the amount of output in console
            stats: 'errors-only',

            // Parse host and port from env to allow customization.
            //
            // If you use Vagrant or Cloud9, set
            // host: options.host || '0.0.0.0';
            //
            // 0.0.0.0 is available to all network devices unlike default `localhost`
            host: options.host, // Defaults to `localhost`
            port: options.port // Defaults to 8080
        },
        plugins: [
            // Enable multi-pass compilation for enhanced performance in larger projects.
            // This is a good default.
            new webpack.HotModuleReplacementPlugin({
                multiStep: true
            })
        ]
    };
};

exports.setupCSS = (paths) => {
    return {
        module: {
            loaders: [{
                test: /\.css$/,
                loaders: ['style', 'css'],
                include: paths
            }]
        }
    };
};

exports.minify = () => {
    return {
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    };
};

exports.setFreeVariable = (key, value) => {
    const env = {};

    env[key] = JSON.stringify(value);

    return {
        plugins: [
            new webpack.DefinePlugin(env)
        ]
    };
};

exports.extractBundle = (options) => {
    const entry = {};
    entry[options.name] = options.entries;

    return {
        // Define an entry point needed for splitting.
        entry: entry,
        plugins: [
            // Extract bundle and manifest files.
            // Manifest is needed for reliable caching.
            new webpack.optimize.CommonsChunkPlugin({
                names: [options.name, 'manifest']
            })
        ]
    };
};
