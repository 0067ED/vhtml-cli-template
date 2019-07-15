var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
// var ExtractTextPlugin = require('extract-text-webpack-plugin')

var env = config.build.env

/**
 * create webpack configure object
 * @param   {object}        entry       webpack entry object
 * @param   {object}        output      webpack output object
 */
module.exports = function(entry, output) {
  var webpackConfig = merge(baseWebpackConfig, {
    entry,
    module: {},
    externals: {
      vue: 'Vue',
      'vhtml-ui': 'vhtml'
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
      path: config.build.assetsRoot,
      libraryTarget: 'umd',
      umdNamedDefine: true,
      ...output
    },

    plugins: [
      // http://vuejs.github.io/vue-loader/en/workflow/production.html
      new webpack.DefinePlugin({
        'process.env': env
      }),
      new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/)
    ]
  })
  return webpackConfig;
}



