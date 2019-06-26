process.env.NODE_ENV = 'production'
// process.env.NODE_ENV_INNER = 'development'

var ora = require('ora')
var chalk = require('chalk')
var webpack = require('webpack')
var webpackConfig = require('./webpack.component.conf')

console.log('as')
const program = require('commander')

program
  .command('build <component-name>')
  .action((name, cmd) => {
    //const options = cleanArgs(cmd)
    const options = cmd;
    console.log(name)
    console.log(options);
    
    return;
    let jbInfo = process.env.JB_DIST_INFO && JSON.parse(process.env.JB_DIST_INFO) || '';
    var spinner = ora('building for production...')
    spinner.start()

    webpack(webpackConfig, function (err, stats) {
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
  })


program.parse(process.argv)

