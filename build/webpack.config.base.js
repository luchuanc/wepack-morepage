const path = require('path');
const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const utils = require('./utils');
const runEnv = JSON.stringify(require('./run-env'));

// 入口html数组
let HTMLDirs = utils.getFileNameList('./src/html');

let HTMLPlugins = [];

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
// 入口文件集合处理
let entries = {};
HTMLDirs.forEach(page => {
	const htmlPlugin = new HTMLWebpackPlugin({
		filename: `${page}.html`,
		template: path.resolve(__dirname, `../src/html/${page}.html`),
		chunks: [page, 'commons']
	});
	HTMLPlugins.push(htmlPlugin);
	entries[page] = path.resolve(__dirname, `../src/js/app/${page}.js`);
});

module.exports = {
	entry: entries,
	externals: {
		'jquery': '$'
	},
	resolve: {
	    extensions: ['.js', '.json'],
	    alias: {
	      '@': resolve('src')
	    }
  	},
	// 加载器
	module: {
		rules: [
			{
				test: /\.html$/,
				loader: 'html-withimg-loader'
			},
			{
		        test: /\.js$/,
		        loader: 'babel-loader',
		        include: [resolve('src'), resolve('test')]
		    },
			{  
                test: /\.css$/,  
                loader: 'style-loaer!css-loader'  
            }, 
			{
				test: /\.less$/, 
				loader: 'style-loader!css-loader!less-loader'
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: '[name].[hash].[ext]',
					outputPath: 'img/'
				}
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: ['file-loader']
			}
		]
	},
	plugins: [
		// 将 css 抽取到某个文件夹
		new ExtractTextPlugin({
			// 生成css文件名
			filename: 'css/[name].[hash].css',
			disable: false,
			allChunks: true
		}),
		// 自动生成 HTML 插件
		...HTMLPlugins
	]
};