/*eslint-disable*/
const path = require('path');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const environment = process.env.NODE_ENV;
const webpackConfig = require('./webpack.config')(environment);
const WEB_DEV_SERVER_PORT=process.env.npm_package_config_web_dev_server_port;
console.log(WEB_DEV_SERVER_PORT);
const compiler = webpack(webpackConfig);

const fs = require('fs');

const bodyParser = require('body-parser');
const backendMiddleware = require('backend-middleware');

const DIST_DIR = path.resolve(__dirname, 'dist');

const backendMiddlewareConfig = {
	routes:require('./backend-middleware-config/routes.js'),
	handlers:require('./backend-middleware-config/handlers.js'),
	urlParameterDateFormat: 'YYYY-MM-DD',
	dataFiles: {
		path: './backend-middleware-config/data',
		extension: '.json'
	},
	resourceUrlParamMapFiles: {
		path: './backend-middleware-config/mapping',
		extension: '.map.json'
	},
	responseTransformerCallback:require('./backend-middleware-config/response.transformer.js'),
	contextPath: '/backend'
};

const server = new WebpackDevServer(compiler, {
	// webpack-dev-server options

	contentBase: DIST_DIR,
	// Can also be an array, or: contentBase: "http://localhost/",

	// hot: true,
	// Enable special support for Hot Module Replacement
	// Page is no longer updated, but a "webpackHotUpdate" message is sent to the content
	// Use "webpack/hot/dev-server" as additional module in your entry point
	// Note: this does _not_ add the `HotModuleReplacementPlugin` like the CLI option does.

	historyApiFallback: true,
	// Set this as true if you want to access dev server from arbitrary url.
	// This is handy if you are using a html5 router.

	compress: true,
	// Set this if you want to enable gzip compression for assets

	proxy: {
		'/backend': {
			target: 'https://localhost:8443',
			secure: false,
			changeOrigin: true,
			cookieDomainRewrite: 'localhost:' + WEB_DEV_SERVER_PORT,
		},
		'/volunteer': {
			target: 'https://localhost:3001',
			pathRewrite: { '^/volunteer': ''},
			secure: false,
			changeOrigin: true,
			cookieDomainRewrite: 'localhost:' + WEB_DEV_SERVER_PORT
		}
	},
	// Set this if you want webpack-dev-server to delegate a single path to an arbitrary server.
	// Use "**" to proxy all paths to the specified server.
	// This is useful if you want to get rid of 'http://localhost:8080/' in script[src],
	// and has many other use cases (see https://github.com/webpack/webpack-dev-server/pull/127 ).

	setup(app) {
		// Here you can access the Express app object and add your own custom middleware to it.
		// For example, to define custom handlers for some paths:
		// app.get('/some/path', function(req, res) {
		//   res.json({ custom: 'response' });
		// });

		if (environment !== 'proxy') { // eg, if not "dev", "offline", or "mock"
			// we can't have the bodyParser.json in the middleware if we're using the proxy;
			// it messes the proxying of the body of the request.
			app.use(bodyParser.json());
			app.use(bodyParser.urlencoded({extended: true}));
			app.use(backendMiddleware.create(backendMiddlewareConfig));
		}
	},

	// pass [static options](http://expressjs.com/en/4x/api.html#express.static) to inner express server
	staticOptions: {
	},

	clientLogLevel: 'info',
	// Control the console log messages shown in the browser when using inline mode. Can be `error`, `warning`, `info` or `none`.

	// webpack-dev-middleware options
	quiet: false,
	noInfo: false,
	filename: webpackConfig.output.filename,
	publicPath: webpackConfig.output.publicPath,
	watchOptions: {
		aggregateTimeout: 300,
		poll: 1000
	},
	headers: { 'X-Custom-Header': 'yes' },
	compress: true,
	stats: { colors  : true },
	https: {
		cert: fs.readFileSync('certs/server.crt'),
		key: fs.readFileSync('certs/server.key'),
		cacert: fs.readFileSync('certs/ca.crt')
	}
});

server.listen(WEB_DEV_SERVER_PORT, 'localhost', (err) => {
	if(err){
		console.error(err);
	}else{
		require('open')(`https://localhost:${WEB_DEV_SERVER_PORT}`);
		console.log('=> Webpack development server is running on port %s',+WEB_DEV_SERVER_PORT);
	}
});
