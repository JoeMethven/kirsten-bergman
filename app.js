import express from 'express';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config.js';
import historyApiFallback from 'connect-history-api-fallback';
import path from 'path';

const port = (process.env.PORT || 3000);
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

if (process.env.NODE_ENV !== 'production') {
  const compiler = webpack(webpackConfig);
  const devMiddleware = webpackDevMiddleware(compiler);

  app.use(historyApiFallback({
    index: './public/index.html'
  }));

  app.use(webpackHotMiddleware(compiler));
  app.use(devMiddleware);

  const DIST_DIR = path.resolve(__dirname, 'public');
  // const HTML_FILE = path.join(DIST_DIR, 'index.html');

  app.use(express.static(DIST_DIR));
  // app.get('*', (req, res) => {
  //   res.sendFile(devMiddleware.fileSystem.readFileSync(webpackConfig.output.path + '/index.html'))
  // });
} else {
  const DIST_DIR = path.resolve(__dirname, 'public');
  const HTML_FILE = path.join(DIST_DIR, 'index.html');

  app.use(express.static(DIST_DIR));
  app.get('*', (req, res) => {
    res.sendFile(HTML_FILE)
  });
}

app.listen(port);
console.log(`Listening at http://localhost:${port}`)
