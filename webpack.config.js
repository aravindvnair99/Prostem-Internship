var path = require('path');
var webpack = require('webpack');
module.exports = {
	mode: 'production',
	entry: './client/index.js',
	output: {
		path: path.resolve(__dirname, 'client'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/
			}, {
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' },
					{
						loader: 'css-loader',
						options: {
							modules: true
						}
					}
				]
			}
		]
	}
}