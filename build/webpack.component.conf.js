var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var vueLoaderConfig = require('./vue-loader.conf')
// var ExtractTextPlugin = require('extract-text-webpack-plugin')

var env = config.build.env


module.exports = function(entry, outputJSFilename, outputStyleFilename) {
    // console.warn(utils.assetsPath('hello.js'));
    console.log(`\n\toutput JavaScript:`, outputJSFilename);
    console.log(`\toutput Style:`, outputStyleFilename);
  var webpackConfig = merge(baseWebpackConfig, {
    entry: entry,
    module: {
    },
    externals: {
      vue: 'Vue',
      'vhtml-ui': 'vhtml'
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
      path: config.build.assetsRoot,
      filename: outputJSFilename,
      libraryTarget: 'umd'
    //   filename: utils.assetsPath(outputFilename),
    //   chunkFilename: utils.assetsPath(`js/[name]-[chunkhash].js`),
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
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/)
    //   new ExtractTextPlugin({
    //     filename: (getPath) => {
    //     //   return utils.assetsPath('css/' + getPath(`veaComponents.css`).replace(/\//g, '_'));
    //         return outputStyleFilename;
    //     },
    //     allChunks: true
    //   })
    ]
  })
  return webpackConfig;
}



