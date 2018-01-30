const config = require('./config');
const path = require('path');
const webpackBase = require('./webpack.config.base');
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

var env = config.build.env;

// 合并配置文件
module.exports = webpackMerge(webpackBase, {
	output: {
		filename: 'js/[name].bundle.[hash].js',
		path: path.resolve(__dirname, '../dist'),
		publicPath: config.build.assetsPublicPath
	},
	devtool: false,
	plugins: [
		new webpack.DefinePlugin({
	      'process.env': env
	    }),
	    // 自动清理 dist 文件夹
		new CleanWebpackPlugin(['dist'], {
			root: path.resolve(__dirname, `../`)
		}),
		// 代码压缩
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
		// 提取公共 JavaScript 代码
		new webpack.optimize.CommonsChunkPlugin({
			// chunk 名为 commons
			name: 'commons',
			filename: 'js/[name].[hash].js'
		})
	]
});