const path = require('path')
const fs = require('fs');
const utils = require('./utils');

process.env.NODE_ENV = 'production'
process.env.IS_BUILD_COMPONENT = 'true'
// process.env.NODE_ENV_INNER = 'development'

var ora = require('ora')
var chalk = require('chalk')
var webpack = require('webpack')
var webpackConfig = require('./webpack.component.conf')

const program = require('commander')

program
  // build a component
  .command('component <component-name>')
  .action((componentName, cmd) => {
    let componentPath = path.join(__dirname, '../src/components/', componentName);
    let packageJsonPath = path.join(componentPath, 'package.json');
    if (!fs.existsSync(componentPath)) {
        console.error(`${componentPath} not exists.`)
        process.exit();
    }
    if (!fs.existsSync(packageJsonPath)) {
        console.error(`${packageJsonPath} not exists.`)
        process.exit();
    }

    let packageJson = require(packageJsonPath);
    if (!packageJson || !packageJson.main) {
        packageJson.main = path.join(componentPath, 'index.vue');
    }
    if (!fs.existsSync(packageJson.main)) {
        console.error(`${packageJson.main} not exists.`)
        process.exit();
    }

    var spinner = ora('building for production...')
    spinner.start()

    let entry = {};
    entry[packageJson.name] = packageJson.main;

    let output = {
        filename: path.join('../static/[name]/index.js'),
        library: utils.toCamel(packageJson.name)
    };
    console.log(chalk.cyan('Component information:\n\tname:'), chalk.green(componentName));
    console.log(chalk.cyan('\tpath:'), chalk.green(componentPath));
    console.log(chalk.cyan('\tlibrary name:'), chalk.green(output.library), '\n');

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

