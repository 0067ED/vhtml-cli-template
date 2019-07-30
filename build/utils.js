var path = require('path');
var fs = require('fs');
const {exec} = require('child_process');

var config = require('../config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
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

/**
 * 检查一个 vue 文件中的 <style> 部分，是否是 scoped 的
 * @param {string} content 文件内容
 */
exports.isStyleScoped = content => {
    let e = null;
    if (!content || !content.length) {
        return e;
    }
    let lines = content.split('\n');
    // 寻找 <style 这一行
    for (let i in lines) {
        let line = lines[i];
        if (!line) continue;
        line = line.trim();
        if (!line) continue;
        if (line.search('<style') === 0) {
            if (line.search('scoped') === -1) {
                e = new Error('样式部分请使用 scoped 限定作用域');
            }
        }
    }
    return e;
}

exports.checkVueFile = filepath => {
    let content = fs.readFileSync(filepath, 'utf8');
    let e = exports.isStyleScoped(content);
    if (e) {
        e.filepath = filepath;
    }
    return e;
}

/**
 * 检查一个自定义组件是否完备
 * @params  {string}    componentName       组件名
 * @returns     {error}                     如果没有错误，则为 null，如果有错误，会在错误变量上绑定 filepath 确定出错文件
 */
exports.checkComponent = (componentName) => {
    let r = '';
    let componentPath = path.join(__dirname, '../src/components/', componentName);
    let packageJsonPath = path.join(componentPath, 'package.json');
    if (!fs.existsSync(componentPath)) {
        r = `路径 ${componentPath} 不存在`
    }
    if (!fs.existsSync(packageJsonPath)) {
        r = '在自定义组件目录中，没有找到 package.json 文件'
    }

    let packageJson = require(packageJsonPath);
    if (!fs.existsSync(packageJson.main)) {
        r = new Error(`组件入口文件不存在`);
        r.filepath = packageJson.main;
    }
    if (!packageJson || !packageJson.main) {
        packageJson.main = path.join(componentPath, 'index.vue');

        r = exports.checkVueFile(packageJson.main);
    }
    if (!packageJson.version) {
        r = new Error('没有指定版本号 version');
        r.filepath = packageJsonPath;
    }
    if (!packageJson.name) {
        r = new Error('没有指定组件名 name');
        r.filepath = packageJsonPath;
    }
    if (!r) {
        return null;
    } else {
        if (typeof r === 'string') {
            return new Error(r)
        } else {
            return r;
        }
    }
};

/**
 * 构建某个自定义模块
 * @param {string} componentName 自定义组件名
 */
exports.doBuild = async componentName => {
    return new Promise(resolve => {
        exec(`node build/build-component.js component ${componentName}`, (err, stdout, stderr) => {
            return resolve({
                stdout,
                stderr
            })
        })
    });
};

/**
 * 返回指定自定义组件的基本信息
 * @param {string} componentName 组件名
 * @return {object} {componentPath: '', packageJsonPath: '', packageJson: {}}
 */
exports.getComponent = componentName => {
    let componentPath = path.join(__dirname, '../src/components/', componentName);
    let packageJsonPath = path.join(componentPath, 'package.json');
    let packageJson = require(packageJsonPath);
    return {
        componentPath,
        packageJsonPath,
        packageJson
    }
}
