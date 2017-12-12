const webpackBase = require('./webpack.config.base');
const webpackMerge = require('webpack-merge');
const path = require('path');
const config = require('./config');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

Object.keys(webpackBase.entry).forEach(function (name) {
  webpackBase.entry[name] = ['./build/dev-client'].concat(webpackBase.entry[name])
})

module.exports = webpackMerge(webpackBase, {
	output: {
		filename: 'js/[name].bundle.[hash].js',
		path: path.resolve(__dirname, '../dist'),
		publicPath: config.dev.assetsPublicPath
	},
	devtool: '#source-map',
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
    	new webpack.NoEmitOnErrorsPlugin(),
    	new FriendlyErrorsPlugin()
	]
});