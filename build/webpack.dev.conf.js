var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var copyPlugin = require('copy-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlHardDisk = require('html-webpack-harddisk-plugin');
var fs = require('fs-extra');
var path = require('path');
var MyPlugin = require('./htmlPlugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default;
// add hot-reload related code to entry chunks

function resolve (dir) {
  return path.join(__dirname, '../../', dir)
}

Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {

  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, extract: true}).concat([
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          query: {
            limit: 1,
            name: utils.assetsPath(`img/[name]-[md5:hash].[ext]`)
          },
          include: /nobase64/
        }, {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: utils.assetsPath(`img/[name]-[md5:hash].[ext]`)
            //name: `./img/[name].[${config.prefix}].[ext]`
          },
          exclude: /icons|nobase64/
        },
    ])
  },
  resolve: {

  },
  externals: {
      vue: 'Vue',
      'vhtml-ui': 'vhtml'
  },

  // cheap-module-eval-source-map is faster for development
  devtool: "#source-map",
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath(`js/[name].js`),
    chunkFilename: utils.assetsPath(`js/[name].js`)
    // library: 'webpackNumbers',
    // libraryTarget: 'this'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    new ExtractTextPlugin({
      filename: (getPath) => {
         return utils.assetsPath('css/' + getPath(`[name].css`).replace(/\//g, '_'));
      },
      allChunks: true
    }),
    //  https://github.com/metalabdesign/css-split-webpack-plugin
    new CSSSplitWebpackPlugin({
      size: 4000,
      filename: (path) => {
         return utils.assetsPath('css/' + `[name]-[part].css`.replace(/\//g, '_'))
      }
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),

    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: 'index.html',
    //   template: 'index.html',
    //   inject: true
    // }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
    }),

    new FriendlyErrorsPlugin(),
    new webpack.ProvidePlugin({
        d3: 'd3'
    }),
    // copy some static files
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static/direct'),
        to: 'static/direct',
        ignore: ['.*']
      }

     ])
  ]
})


var pages = utils.getEntries('./src/pages/**/main.js');
for(var page in pages) {
  // 配置生成的html文件，定义路径等
  console.log('page',page)

  var htmlTemplate = '!!raw-loader!./static/page.html'
  if (page.indexOf('mobile') === 0) {
    htmlTemplate = `!!raw-loader!./static/mobile/online.html`;
  }

  var conf = {
    alwaysWriteToDisk: true,
    filename: '../../src/views/' + page + '/index.html',
    template: htmlTemplate, //模板路径
    inject: true,
    excludeChunks: Object.keys(pages).filter(item => {
      return (item != page)
    })
  }
  // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
  module.exports.plugins.push(new HtmlWebpackPlugin(conf))
}

module.exports.plugins.push(new MyPlugin({env: 'dev'}))
module.exports.plugins.push(new HtmlHardDisk())
