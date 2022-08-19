import cookieParser from 'cookie-parser';
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import methodOverride from 'method-override';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from './webpack_conf/webpack.dev.js';
import bindRoutes from './routes.mjs';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.static('dist'));

// Set up Webpack in dev env
const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
	const compiler = webpack(webpackConfig);
	app.use(
		webpackDevMiddleware(compiler, {
			publicPath: webpackConfig.output.publicPath,
			// html only
			writeToDisk: (filePath) => /\.html$/.test(filePath),
		})
	);
	app.use(
		webpackHotMiddleware(compiler, {
			log: false,
			path: '/__webpack_hmr',
			heartbeat: 10 * 1000,
		})
	);
}

io.on('connection', (socket) => {
	console.log('connected to my server!!');
	socket.on('message', (message) => {
		socket.broadcast.emit('message:receive', message);
	});
});

// Bind route definitions to the Express application
bindRoutes(app);

// Set Express to listen on the given port
const PORT = process.env.PORT || 3004;
server.listen(PORT);
