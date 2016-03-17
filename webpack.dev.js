import webpack from 'webpack';
import baseConfig from './webpack.base.config';
import getCurrentBranch from '../../utils/getCurrentBranch';

require('dotenv').load();

const { HOST, PORT } = process.env;

const devConfig = baseConfig.mergeDeep({

  entry: {
    bundle: [
      `webpack-dev-server/client?http://${HOST}:${PORT}`,
      'webpack/hot/dev-server',
      './bundle',
    ],
  },

  output: {
    path: '/build/',
    filename: '[name].hot.js',
    publicPath: `http://${HOST}:${PORT}/build/`,
    devtoolModuleFilenameTemplate: '/[absolute-resource-path]',
  },

  module: {
    loaders: [
      {
        test: [/\.js$/, /\.jsx$/],
        loaders: ['babel?stage=0'],
        exclude: /node_modules/,
      },
      {
        test: [/\.sass$/, /\.scss$/],
        loader: 'style!css?sourceMap!autoprefixer?browsers=last 2 versions!sass?sourceMap',
      },
      {
        test: /\.css$/,
        loader: 'style!css',
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify({
        ...process.env,
        CIRCLE_BRANCH: getCurrentBranch(),
      }),
    }),
  ],

  debug: true,

  devtool: 'eval-source-map',
});

export default devConfig;
