const path                    = require('path');
const webpack                 = require('webpack');
const ExtractTextPlugin       = require("extract-text-webpack-plugin");
const UglifyJSPlugin          = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BrowserSyncPlugin       = require('browser-sync-webpack-plugin');

const config = {
  entry: {
    home: './main.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
				  	use: ['css-loader', 'postcss-loader', 'sass-loader']
				}),
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			}
      //{
			//    test: /\.(jpg|png|svg)$/,
      //    loader: "file-loader?publicPath=../&name=/assets/img/img2/img-[hash:6].[ext]"
			//}
		]
	},
	plugins: [
		new ExtractTextPlugin('./style.css'),
		new BrowserSyncPlugin({
		    proxy: 'localhost/jc',
		    port: 3000,
		    files: [
		        '**/*.php'
		    ],
		    ghostMode: {
		        clicks: false,
		        location: false,
		        forms: false,
		        scroll: false
		    },
		    injectChanges: true,
		    logFileChanges: true,
		    logLevel: 'debug',
		    logPrefix: 'wepback',
		    notify: true,
		    reloadDelay: 0
		})
	]
};

//If true, JS and CSS files will be minified
if (process.env.NODE_ENV === 'production') {
	config.plugins.push(
		new UglifyJSPlugin(),
		new OptimizeCssAssetsPlugin()
	);
}

module.exports = config;
