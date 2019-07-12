var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var glob = require('glob');
const styleVariables = require('./common');

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      let styleOptions = {
        sourceMap: options.sourceMap
      }

      if (loader === 'less') {
          styleOptions.globalVars = styleVariables;
      }

      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, styleOptions)
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // http://vuejs.github.io/vue-loader/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

exports.getEntries = function (globPath) {
  // rhino todo
  // var entries = {jsbridge: './static/jsbridge.js'}
  var entries = {}
  glob.sync(globPath).forEach(function (entry) {
    let tmp;
    for (let i = 3; i < 9; i++) {
        tmp = entry.split('/').splice(-i);
        if (tmp[0] === 'pages') {
            i -= 1
            tmp = entry.split('/').splice(-i);
            break
        }
    }

    tmp.pop();
    var moduleName = `${tmp.join('/')}`;
    entries[moduleName] = entry
  });
  return entries;
}

/**
 * 将组件名称，由小写加中划线，改为大写字母打头的驼峰命名。
 * 如 text-viewer 之类的命名，转换为 TextViewer
 * @param   {string}        name        原组件名，如 text-viewer
 * @returns {string}                    转换结果，如 TextViewer
 */
exports.toCamel = (name) => {
    if (!name || typeof name !== 'string') {
        return name;
    }
    return name.toLowerCase().replace(/(-|^)[a-z]/g, x => x.toUpperCase().replace('-', ''));
}
