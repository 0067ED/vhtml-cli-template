const path = require('path')
const fs = require('fs');
const utils = require('./utils');

process.env.NODE_ENV = 'production'
process.env.IS_BUILD_COMPONENT = 'true'
// process.env.NODE_ENV_INNER = 'development'

process.on('exit', code => {
    if (String(code) !== '0') {
        return console.log(chalk.red('Exit with ' + code))
    }
})

var ora = require('ora')
var chalk = require('chalk')
var webpack = require('webpack')
var webpackConfig = require('./webpack.component.conf')

const program = require('commander')

program
  // build a component
  .command('component <component-name>')
  .action((componentName, cmd) => {
    // let componentPath = path.join(__dirname, '../src/components/', componentName);
    // let packageJsonPath = path.join(componentPath, 'package.json');
    // let packageJson = require(packageJsonPath);
    let {componentPath, packageJson} = utils.getComponent(componentName);

    let err = utils.checkComponent(componentName);
    if (err) {
        // Build Error 文字请不要修改，用于通过输出判断是琐出错
        console.log('  ', chalk.bgRed('Build Error'), err.filepath ? ' ' + chalk.yellow(err.filepath) : '', '\n  ', err.message, '\n');
        // process.kill(process.pid);
        process.exit(-1)
    }

    var spinner = ora('building for production...')
    spinner.start()

    let entry = {};
    entry[packageJson.name] = packageJson.main;

    let output = {
        filename: path.join(`../static/[name]_${packageJson.version}/index.js`),
        // library: utils.toCamel(packageJson.name)
        library: packageJson.name
    };
    console.log(chalk.cyan('\n  Component information:\n    name:'), chalk.green(componentName));
    console.log(chalk.cyan('    path:'), chalk.green(componentPath));
    console.log(chalk.cyan('    library name:'), chalk.green(output.library));
    console.log(chalk.cyan('    version:'), chalk.green(packageJson.version), '\n');

    let cfg = webpackConfig(entry, output);
    webpack(cfg, function (err, stats) {
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
