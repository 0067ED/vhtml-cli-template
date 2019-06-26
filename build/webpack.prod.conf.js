var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default;
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var MyOfflinePlugin = require('./offlineHtmlPlugin');
var ZipPlugin = require('zip-webpack-plugin');
var packageConfig = require('../package.json')
var JB_DIST_INFO = process.env.JB_DIST_INFO;
console.log('JB_DIST_INFO', JB_DIST_INFO);
var env = config.build.env
var webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
      }).concat([
          {
            test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: 'url-loader',
            query: {
              limit: 1,
              name: utils.assetsPath(`img/[name]-[md5:hash]|[path]|.[ext]`),
              outputPath: function(url){
                   var pathReg = /\|.*\|/;
                   url = url.replace(pathReg, function(whole){
                       return ''
                   })
                  return url;
              },
              publicPath: function(url) {
                    var pathReg = /\|.*\|/;
                    var replace;
                    replace = '../img';

                    url = url.replace(pathReg, function(whole){
                        return ''
                    })
                    url = url.replace(/^static\/img/, replace)
                    return url
                }
            },
            include: /nobase64/
          }, {
            test: /\.(png|jpe?g|gif)(\?.*)?$/,
            loader: 'url-loader',
            query: {
              limit: 10000,
              //name: utils.assetsPath(`img/[name].[${config.prefix}].[ext]`),
              name: utils.assetsPath(`img/[name]-[md5:hash]|[path]|.[ext]`),
              //useRelativePath: true,
              outputPath: function(url){
                   var pathReg = /\|.*\|/;

                   url = url.replace(pathReg, function(whole){
                       return ''
                   })
                  return url;
              },
              publicPath: function(url) {
                    var pathReg = /\|.*\|/;
                    var replace;
                    replace = '../img';

                  url = url.replace(pathReg, function(whole){
                      return ''
                  })

                  url = url.replace(/^static\/img/, replace)
                  return url
              }
            },
            exclude: /icons|nobase64/
          }
      ])
  },
  externals: {
      vue: 'Vue',
      'vhtml-ui': 'vhtml'
  },
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath(`js/[name].js`),
    chunkFilename: utils.assetsPath(`js/[name]-[chunkhash].js`),
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
    // extract css into its own file
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
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    // repo: https://github.com/NMFR/optimize-css-assets-webpack-plugin
    /*
        [notice] 注意 这里有个bug
        全局的package中的 browserlist 和 postcssrc 都对这里的cssnanp设置不起作用
        今天着急上线所以暂不把这里的配置分离， 之后需要把这里的配置分离到postcssrc中
        */
    new OptimizeCSSPlugin({
      // cssProcessor: require('nano')
      cssProcessorOptions: {
        autoprefixer: {
          //  browsers: 'last 2 version, IE > 8'
          browsers: packageConfig.browserlist.join(',')
        },
        safe: true
      }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    // new HtmlWebpackPlugin({
    //   filename: config.build.index,
    //   template: 'index.html',
    //   inject: true,
    //   minify: {
    //     removeComments: true,
    //     collapseWhitespace: true,
    //     removeAttributeQuotes: true
    //     // more options:
    //     // https://github.com/kangax/html-minifier#options-quick-reference
    //   },
    //   // necessary to consistently work with multiple chunks via CommonsChunkPlugin
    //   chunksSortMode: 'dependency'
    // }),
    // split vendor js into its own file
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../../../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  ]
})

if (process.env.NODE_ENV_INNER !== 'development') {
     // webpackConfig.plugins.splice(1,1);
     webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        },
        sourceMap: true
      }))
}

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (true || config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

webpackConfig.plugins.push(new HtmlWebpackPlugin({
  filename: path.resolve(__dirname, '../public/cdn/ka/offline.html'),
  template: `!!raw-loader!./static/mobile/offline.html`, //模板路径
  chunks: ['manifest', 'jsbridge', 'mobile/ka']
}))

webpackConfig.plugins.push(new HtmlWebpackPlugin({
  filename: path.resolve(__dirname, '../public/cdn/ka/oaOffline.html'),
  template: `!!raw-loader!./static/mobile/oaOffline.html`, //模板路径
  chunks: ['manifest', 'jsbridge', 'mobile/ka']
}))

webpackConfig.plugins.push(new MyOfflinePlugin())

const alloyIds = {
    'ka': '3022',
    'oaka': '3023'
}
var pages = utils.getEntries('./src/pages/**/main.js');
for (var page in pages) {
    if (page.indexOf('mobile/') === 0) {
        var subname = page.substring(7);
        if (alloyIds[subname]) {
            var offlineRe = new RegExp('mobile_' + subname + '.css|' + subname
                + '.js|manifest.js|jsbridge.js|vue.prod.js|offline.html');
            var oaOfflineRe = new RegExp('mobile_' + subname + '.css|' + subname
                + '.js|manifest.js|jsbridge.js|vue.prod.js|oaOffline.html');
            webpackConfig.plugins.push(new ZipPlugin({
              include: offlineRe,
              path: '../offline/',
              pathMapper: function(assetPath) {
                  if (assetPath.indexOf('static') === 0) {
                      assetPath = 'bqq.gtimg.com/vcc/' + assetPath;
                  }
                  if (assetPath.indexOf('vhtml') === 0) {
                      assetPath = 'bqq.gtimg.com/' + assetPath;
                  }
                  if (assetPath.indexOf('offline.html') > 0) {
                      assetPath = 'admin.qidian.qq.com/mobile/'
                        + assetPath.slice(0, -12) + '/index.html';
                  }
                  return assetPath;
              },
              filename: alloyIds[subname] + '.zip'
            }))
        }

        if (alloyIds['oa' + subname]) {
            webpackConfig.plugins.push(new ZipPlugin({
              include: oaOfflineRe,
              path: '../offline/',
              pathMapper: function(assetPath) {
                  if (assetPath.indexOf('static') === 0) {
                      assetPath = 'oa.gtimg.com/vcc/' + assetPath;
                  }
                  if (assetPath.indexOf('vhtml') === 0) {
                      assetPath = 'oa.gtimg.com/' + assetPath;
                  }
                  if (assetPath.indexOf('oaOffline.html') > 0) {
                      assetPath = 'oaadmin.qidian.qq.com/mobile/'
                        + assetPath.slice(0, -14) + 'index.html';
                  }
                  return assetPath;
              },
              filename: alloyIds['oa' + subname] + '.zip'
            }))
        }
    }
}

module.exports = webpackConfig



// var pages = utils.getEntries('./src/pages/**/main.js');
// for(var page in pages) {
// // 配置生成的html文件，定义路径等
// var conf = {
//   alwaysWriteToDisk: true,
//   filename: '../../src/views/' + page + '/index.html',
//   template: '!!raw-loader!./static/page.html', //模板路径
//   inject: true,
//   excludeChunks: Object.keys(pages).filter(item => {
//     return (item != page)
//   })
// }
// // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
// module.exports.plugins.push(new HtmlWebpackPlugin(conf))
// }
//
// module.exports.plugins.push(new MyOfflinePlugin({env: 'prod'}))
