var artTemplate = require('./artTemplate');
var fs = require('fs');
var path = require('path');
var viewPath = path.join(__dirname, '../../src/views');

function safeJSONStringify(obj) {
    return JSON.stringify(obj, replacer).replace(/\\u0000\\u0001/g, '\\');
}

function replacer(key, value) {
    var RE = /[& <>'"\/]/;

    return typeof value === 'string' && RE.test(value) ?
        value.replace(/([& <>'\/])/g, '\x00\x01$1') :
        value;
}

var msie = 'msie';
var ua = {};
ua.isMSIE = function(ua) {
    return typeof ua === 'string' && ua.toLowerCase().indexOf(msie) !== -1 ? true : false;
};

ua.isErrorSys = function(ua, sysList) {
    var result = false;
    if (typeof ua !== 'string') {
        return result;
    }
    ua = ua.toLowerCase();
    for (var i in sysList) {
        if (ua.indexOf(sysList[i].toLowerCase()) !== -1) {
            result = true;
            break;
        }
    }

    return result;
};

artTemplate.config('base', viewPath);
artTemplate.config('extname', '');
// artTemplate.helper('widget', artTemplate.utils.$include);
artTemplate.helper('JSON', JSON);
artTemplate.helper('Date', Date);
artTemplate.helper('Math', Math);
artTemplate.helper('ua', ua);
artTemplate.helper('encodeURIComponent', encodeURIComponent);
artTemplate.helper('decodeURIComponent', decodeURIComponent);
artTemplate.helper('safeJSONStringify', safeJSONStringify);
// artTemplate.helper('dateTool', dateTool);

// var tpl = fs.readFileSync(p).toString();

// var res = artTemplate('qidian/tpl.html');
// console.log(path.resolve(viewPath, 'locals.json'));

// console.log(res.toString())
// var html = res({
//     locals: locals.local,
//     data: require('../../dev/page/page.js')
// })
// console.log(html)

function render(url, data) {
    var locals = JSON.parse(
        fs.readFileSync(
            path.join(viewPath, 'locals.json')
        ).toString()
    );
    var tpl = fs.readFileSync(path.join(viewPath, url), 'utf-8');
    return artTemplate.render(tpl, {
        locals: Object.assign({}, locals.common, locals.local),
        data: data
    });
    // return artTemplate(tpl)({
    //     locals: locals.local,
    //     data: data
    // });
}


module.exports = render;
