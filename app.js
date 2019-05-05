import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config.js';
import morgan from 'morgan';
import history from 'connect-history-api-fallback';
import path from 'path';

import api from './src/api';

const dev = process.env.NODE_ENV === 'development' ? true : false;
const app = express();

mongoose.connect('mongodb://localhost:27017/kirstenbergman', { useNewUrlParser: true });

// log to console when requests are made
if (dev) app.use(morgan('dev'));

// serve static files from DIST_DIR
app.use(express.static(path.resolve(__dirname, 'public')));

// tell server to use json format
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH');
    return res.status(200).json({});
  }

  next();
});

// initialises API
api(app);

// handle errors if request error status isn't OK (200)
// 404 is covered by client router, this handles all other status codes
app.use((error, req, res, next) => {
  if (error.status === 200) return next();

  // error handling
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// rewrite all requests with headers that include html to the index html file (so client router works on refresh)
app.use(history());

if (dev) {
  const compiler = webpack(webpackConfig);
  const devMiddleware = webpackDevMiddleware(compiler);

  // use hot reloading and dev middleware for every request
  app.use(webpackHotMiddleware(compiler));
  app.use(devMiddleware);
}

export default app;