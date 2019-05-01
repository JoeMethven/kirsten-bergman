const debug = process.env.NODE_ENV !== 'production';
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: path.resolve(__dirname, 'src/app/client.js'),
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'client.min.js',
    publicPath: '/'
  },
  mode: debug ? 'development' : 'production',
  devServer: {
    host: '0.0.0.0',
    contentBase: './public',
    hot: true,
    stats: {
      errorDetails: true
    }
  },
  resolve: {
    modules: [path.resolve(__dirname, 'public'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.sass$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?sourceMap']
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/'
            }
          }
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'font/'
            }
          }
        ],
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, 'src/img'), to: path.resolve(__dirname, 'public/img') }
    ]),
    new HTMLWebpackPlugin({
      template: './src/index.html',
      hash: true
    })
  ]
};

module.exports = config;
