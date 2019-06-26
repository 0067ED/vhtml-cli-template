var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var JB_DIST_INFO = process.env.JB_DIST_INFO;
var vueLoaderConfig = require('./vue-loader.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

console.log('JB_DIST_INFO', JB_DIST_INFO);
var env = config.build.env
var webpackConfig = merge(baseWebpackConfig, {
  entry: './src/components/veaComponents.js',
  module: {
   
  },
  externals: {
      vue: 'Vue',
      'vhtml-ui': 'vhtml'
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath(`js/veaComponents.js`),
    // chunkFilename: utils.assetsPath(`js/[name]-[chunkhash].js`),
    // library: 'webpackNumbers',
    // libraryTarget: 'this'
  },

  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   },
    //   sourceMap: true
    // }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    new ExtractTextPlugin({
      filename: (getPath) => {
         return utils.assetsPath('css/' + getPath(`veaComponents.css`).replace(/\//g, '_'));
     },
      allChunks: true
    }),
  ]
})

module.exports = webpackConfig



