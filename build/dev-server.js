var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
var fs = require('fs-extra');
var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
var webpackComConfig = require('./webpack.component.conf');
//  var webpackConfig = require('./webpack.prod.conf')
var bodyParser = require('body-parser')
let mock = require('./mock')

var devPath = path.resolve(__dirname, '../dev');
// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

// fs.emptyDirSync(path.join(__dirname, '../src/views'))
// fs.copySync(path.join(__dirname, '../static/locals.json'), path.join(__dirname, '../dist/views/locals.json'));
var render = require('./middleware/render');

var app = express()
var server = require('http').createServer(app);
var io = require('./io')(server);

// 当非vue 项目想要使用 vea 的业务组件的时候,本地调试请打开
var compiler = webpack([webpackConfig,webpackComConfig])

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes

compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

compiler.plugin("done", function(statsResult) {
    hotMiddleware.publish({ action: 'reload' })
 });

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
//   console.log(options.filter || context, options)
  app.use(proxyMiddleware(options.filter || context, options))
})

 app.get(/^\/(examples|iconTool|utils)/, function(req,res,next){
     console.log('url:' + req.url)
     if (req.url.match(/\.html$/) ||
        req.url.indexOf('.') !== -1 ||
        (req.get('x-requested-with') === 'XMLHttpRequest')) {
            // console.log('next',req.url)
         next();
         return;
     }
     var baseUrl = '/examples/pages/index';
     if(req.url.match(/^\/iconTool/)) {
         baseUrl = '/iconTool/index';
     } else if(req.url.match(/^\/utils/)) {
        baseUrl = '/utils/index';
     }
    //  var baseUrl = '/call/index';
     var viewPath = baseUrl + '.html';

     var mockPath = path.join(devPath, 'page', baseUrl);
     var defaultMockPath = path.join(devPath, 'page', 'default.js');
     var data;
     var html;
     try {
          delete require.cache[require.resolve(mockPath)];
          data = require(mockPath);
     } catch(e) {
        data = require(defaultMockPath);
     }

     html = render(viewPath, data);

     res.end(html)
 });

 app.get(/^\/(ea|call|mobile|cs|mng|partner)/, function(req, res, next) {
     console.log('url:' + req.url);
     //console.log(req.headers);
     let whiteList = ['/ea/crowd/package/createCustom', '/call/ivr', '/call/payment/midashi', '/call/guide', '/call/callqq'];
     let mobiledirect = '/call/ka';

    //  console.log('header:' + req.headers. common['X-Requested-With'])
     if (req.url.match(/\.html$/) ||
        req.url.indexOf('.') !== -1 ||
        (req.get('x-requested-with') === 'XMLHttpRequest')) {
            // console.log('next',req.url)
         next();
         return;
     }
     var paths = req.url.split('/');
     var baseUrl = '/' + paths[1] + '/index';
     if (paths[2] && paths[1] === 'mobile') {
         baseUrl = '/' + paths[1] + '/' + paths[2] + '/index';
     }
     // 兼容带参数跳转的情况
     var realReqUrl = req.url.replace(/\?.+/g, '');
     var viewPath = whiteList.indexOf(realReqUrl) > -1 ? realReqUrl +  '/index.html' : baseUrl + '.html';
    //  console.log(viewPath);

     var mockPath = path.join(devPath, 'page', '/' + req.url.replace(/\?.+/g, ''));
     var defaultMockPath = path.join(devPath, 'page', 'default.js');
     var data;
     var html;
     try {
          delete require.cache[require.resolve(defaultMockPath)];
          delete require.cache[require.resolve(mockPath)];
          data = require(mockPath);
     } catch(e) {
        // console.log(mockPath);
        data = require(defaultMockPath);
     }
     console.log('viewPath', viewPath, 'data', data)
     html = render(viewPath, data);
     res.end(html);
 });

app.get('/', function(req, res, next) {
    var dpath = './dashboard.js';
    delete require.cache[require.resolve(dpath)];
    var str = require(dpath);
    res.setHeader("Content-Type", "text/html");
    res.end(str);
})


// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve html
//app.get(/\.html$/, require('./middleware/hengine').render);
// app.all(/\/ea\//,  require('../middleware/cgi'));



app.get(/\/base\.css$/, function(req,res,next){
    res.setHeader("Content-Type", "text/css");
    res.end(fs.readFileSync(path.resolve(__dirname, '../static/base.css'), 'utf8'))
});
// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(mock);

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
// console.log(staticPath);
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})




module.exports = server.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
