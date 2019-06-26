process.env.NODE_ENV = 'production'
process.env.NODE_ENV_INNER = 'development'

const COMPILE_MODULE = process.argv.slice(2).join('');

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var http = require('http')
var utils = require('./utils')
var fs = require('fs')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')
// var webpackComConfig = require('./webpack.component.conf');

let jbInfo = process.env.JB_DIST_INFO && JSON.parse(process.env.JB_DIST_INFO) || '';
let jbModule = (jbInfo && jbInfo.mapping_id && jbInfo.mapping_id.name) || '';
var spinner = ora('building for production...')
spinner.start()

// var download = function(url, dest, cb) {
//   var file = fs.createWriteStream(dest);
//   var request = http.get(url, function(response) {
//     response.pipe(file);
//     file.on('finish', function() {
//       file.close(cb);  // close() is async, call cb after close completes.
//     });
//   }).on('error', function(err) { // Handle errors
//     fs.unlink(dest); // Delete the file async. (But we don't check the result)
//     rm(dest, err => {
//       if (err) throw err
//     });
//     if (cb) cb();
//   });
// };

var pack = function() {
    
    webpack([webpackConfig], function (err, stats) {
      spinner.stop()
      if (err) throw err
      process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
      }) + '\n\n')

      console.log(chalk.cyan('  Build complete.\n'))
      console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
      ))
    })
};

pack();
// var dest = path.resolve(__dirname, '../offline/vhtml/vue.prod.js');
// rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
//   if (err) throw err
//   rm(dest, err => {
//       if (err) throw err
//       download('http://bqq.gtimg.com/vhtml/latest/vue.prod.js', dest, pack)
//   })
// })
