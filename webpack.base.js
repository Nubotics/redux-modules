import { resolve } from 'path';
import { path as rootPath } from 'app-root-path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { fromJS } from 'immutable';

const moment =
  resolve(rootPath, 'node_modules/moment/min/moment-with-locales.min.js');

export default fromJS({

  context: `${rootPath}/src`,

  entry: {
    bundle: './bundle',
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
        loader: ExtractTextPlugin.extract(
          'style',
          'css!autoprefixer?browsers=last 2 versions!sass',
        ),
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css'),
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'file?name=[name].[ext]',
      },
      {
        test: /\.(woff|svg|eot|ttf|woff2)$/,
        loader: 'file?name=[sha512:hash:base64:7].[ext]',
      },
    ],
    noParse: [moment],
  },

  resolve: {
    modulesDirectories: [
      'src/_shared',
      'node_modules',
    ],

    extensions: ['', '.js', '.jsx', '.json', '.css', '.sass', '.scss'],

    alias: {
      'react': resolve(rootPath, 'node_modules/react'),
      'react/addons': resolve(rootPath, 'node_modules/react/addons'),
      moment,
    },
  },

  node: {
    process: true,
  },

});
