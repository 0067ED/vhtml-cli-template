var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // entry: utils.getEntries('./src/pages/examples/main.js'),
  entry: {},
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json', '.css', '.less'],
    alias: {
      //'vue$': 'vue/dist/vue.js',
      '@': resolve('src'),
      'src': resolve('src'),
      'components': resolve('src/components')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      // {
      //   test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      //   loader: 'url-loader',
      //   query: {
      //     limit: 10000,
      //     name: utils.assetsPath(`../img/[name].[${config.prefix}].[ext]`)
      //     //name: `./img/[name].[${config.prefix}].[ext]`
      //   },
      //   exclude: /icons/
      // },
      {
        test: /\.svg(\?\S*)?$/,
        loader: 'svg-sprite-loader',
        query: {
            prefixize: true,
            name: '[name]-[hash]'
        },
        include: [resolve('src')],
        exclude: /node_modules|bower_components/
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }

    ]
  }
}
