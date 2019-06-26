var config  = require('../config/index');
function MyOfflinePlugin() {
}

MyOfflinePlugin.prototype.apply = function(compiler) {
  // ...
  var that = this;
  compiler.plugin('compilation', function(compilation) {

    compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
        //console.log(htmlPluginData);
        // if (that.env === 'dev') {
        //     // htmlPluginData.assets.css.push('http://localhost:8085/vhtml.css')
        //     // htmlPluginData.assets.js.splice(1, 0, 'http://localhost:8085/vhtml.js')
        //     // htmlPluginData.assets.js.splice(1, 0, 'http://localhost:8085/vue.js')
        // } else {
        //console.log(htmlPluginData.assets)

        if (htmlPluginData.outputName.indexOf('/oaOffline.html') > 0) {
            htmlPluginData.assets.css = htmlPluginData.assets.css.map((css)=>{
                return '//oa.gtimg.com/vcc' + css;
            });
            htmlPluginData.assets.js = htmlPluginData.assets.js.map((js)=>{
                return '//oa.gtimg.com/vcc' + js;
            });
        }
        else if (htmlPluginData.outputName.indexOf('/offline.html') > 0) {
            htmlPluginData.assets.css = htmlPluginData.assets.css.map((css)=>{
                return '//bqq.gtimg.com/vcc' + css;
            });
            htmlPluginData.assets.js = htmlPluginData.assets.js.map((js)=>{
                return '//bqq.gtimg.com/vcc' + js;
            });
        }

        // htmlPluginData.assets.js.unshift(`//<%== locals.vhtml %>vhtml.js<%== locals.lbfConf.comboSuffix %>`)
        // htmlPluginData.assets.js.unshift(`//<%== locals.vhtml %>vue.${that.env==='dev' ? '' : 'prod'}js<%== locals.lbfConf.comboSuffix %>`)


    //   console.log('----------------')
    //   console.log(htmlPluginData);
      callback(null, htmlPluginData);
    });

    compilation.plugin('html-webpack-plugin-after-html-processing', function(htmlPluginData, callback) {



    //   console.log('----------------')
    //   console.log(htmlPluginData);
      callback(null, htmlPluginData);
    });


  });

};

module.exports = MyOfflinePlugin;
