const path = require('path');
const fs = require('fs');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpack = require('webpack');
const utils = require('./utils');
const runEnv = JSON.stringify(require('./run-env'));
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

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
			/*{
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },*/
            {
		      test: /\.(css|less)$/,
		      loader: ExtractTextPlugin.extract({
		        fallbackLoader: 'style-loader',
		        loader: 'css-loader!postcss-loader!less-loader'
		      })
		    },
            /*{
                test: /\.less$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            root: path.resolve(__dirname, '../src/img'),   // url里，以 / 开头的路径，去找src/static文件夹
                            minimize: true, // 压缩css代码
                            alias: {
                                '@': path.resolve(__dirname, '../src/img') // '~@/logo.png' 这种写法，会去找src/img/logo.png这个文件
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'less-loader',   // compiles Less to CSS
                        options: {
                            
                        }
                    }
                ]
            },*/
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
		new webpack.LoaderOptionsPlugin({
		    options: {
		      postcss: function () {
		        return [precss, autoprefixer];
		      }
		    }
		 }),
        // 将 css 抽取到某个文件夹
		new ExtractTextPlugin({
			// 生成css文件名
			filename: 'css/[name].[hash].css'
		}),
		new OptimizeCSSPlugin({
	      cssProcessorOptions: {
	        safe: true
	      }
	    }),
		//静态资源拷贝
		new CopyWebpackPlugin([
        {
            from: 'src/static',
            to: 'static'
        }]), 
		// 自动生成 HTML 插件
		...HTMLPlugins
	]
};