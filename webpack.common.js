/*eslint-disable */
const HtmlWebpackPlugin = require('html-webpack-plugin'); // installed via npm
const webpack = require('webpack'); // to access built-in pluginsar path =
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
	filename: '[name].[contenthash].css',
	disable: process.env.NODE_ENV === 'development'
});

const DIST_DIR = path.resolve(__dirname, 'dist');
const SRC_DIR = path.resolve(__dirname, 'src');

const isExternal = (module) => {
	const context = module.context;

	if (typeof context !== 'string') {
		return false;
	}

	return context.indexOf('node_modules') !== -1;
};

const commonConfig = {
	context: SRC_DIR,
	devtool: 'source-map',
	entry: [
		// the entry point of our app
		'babel-polyfill',
		'./scripts/index.js'
	],
	devServer: {
		historyApiFallback: true
	},
	output: {
		path: DIST_DIR,
		filename: 'bundle.js',
		publicPath: '/study-team/'
		// necessary for HMR to know where to load the hot update chunks
	},
	module: {
		rules:[
			{
				test: /\.(js|jsx)$/,
				use: [
					{ loader:'babel-loader'},
					{ loader: 'eslint-loader'}
				],
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: extractSass.extract({
					use: [
						{
							loader: 'css-loader',
							options: {
								sourceMap: true
							}
						},
						{
							loader: 'sass-loader',
							options:{
								sourceMap: true,
								sourceComments: true
							}
						}
					],
					// use style-loader in development
					fallback: 'style-loader'
				})
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: 'css-loader'
				})
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg|png|jpg)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url-loader?limit=10000',
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	plugins:[
		new webpack.NoEmitOnErrorsPlugin(),
		// new webpack.optimize.UglifyJsPlugin(), //when using react it is best to use -p option while building with webpack for production which triggers minification
		new HtmlWebpackPlugin({
			template: 'index.html',
			title: 'My title',
			showErrors: true,
			xhtml: true,
			inject: 'body', // true | 'head' | 'body' | false
			minify: {}
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendors',
			filename: 'vendors-[hash].js',
			minChunks(module) {
				return isExternal(module);
			}
		}),
		extractSass
	]
};

module.exports = commonConfig;
