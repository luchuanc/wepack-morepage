const fs = require('fs');
const inquirer = require('inquirer');
const webpack = require('webpack');

const webpackConfig = require('./webpack.config.prod');

webpack(webpackConfig, (err, stats) => {
	if (err) {
		console.log(err);
		return;
	}
	process.stdout.write(stats.toString({
		colors: true,
		modules: false,
		children: false,
		chunks: false,
		chunkModules: false
	}) + '\n');
});