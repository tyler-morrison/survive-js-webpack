const path = require('path');

// Webpack Plugins
const merge = require('webpack-merge'),
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
    config = merge(common, {});
}

module.exports = config;
