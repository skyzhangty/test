/*eslint-disable */
const webpack = require('webpack');
const Merge = require('webpack-merge');
const CommonConfig = require('./webpack.common.js');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const config = Merge(CommonConfig, {
	plugins:[
		new FaviconsWebpackPlugin({
            logo:'./assets/images/logo.png',
            // The prefix for all image files (might be a folder or a name)
            prefix: 'icons-[hash]/',
            // Emit all stats of the generated icons
            emitStats: false,
            // The name of the json containing all favicon information
            statsFilename: 'iconstats-[hash].json',
            // Generate a cache file with control hashes and
            // don't rebuild the favicons until those hashes change
            persistentCache: true,
            // Inject the html into the html-webpack-plugin
            inject: true,
            // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
            background: '#fff',
            // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
            title: 'Webpack App',

            // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
            icons: {
                android: true,
                appleIcon: true,
                appleStartup: true,
                coast: false,
                favicons: true,
                firefox: true,
                opengraph: false,
                twitter: false,
                yandex: false,
                windows: true
            }
        })
	]
});

module.exports = config;
