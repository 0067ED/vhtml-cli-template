var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV === 'production'
let loaderConfig = {
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
};

// 如果是打包组件，则 css js 不分享
if (process.env.IS_BUILD_COMPONENT !== 'true') {
    console.log('here', process.env.IS_BUILD_COMPONENT)
    loaderConfig.extract = true;
}
module.exports = {
  loaders: utils.cssLoaders(loaderConfig),
   postcss: {}
}
