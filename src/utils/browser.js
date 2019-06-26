let ua = navigator.userAgent.toLowerCase();
let matched;
// let browser;

/**
 * Browser type and versions, see <a target='_blank' href='http://api.jquery.com/jQuery.browser/'>jQuery.browser</a>
 * @class browser
 * @namespace lang
 * @module lang
 */

// Use of jQuery.browser is frowned upon.
// More details: http://api.jquery.com/jQuery.browser
// uaMatch maintained for back-compat
let match = /(chrome)[ \/]([\w.]+)/.exec(ua)
    || /(webkit)[ \/]([\w.]+)/.exec(ua)
    || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua)
    || /(msie) ([\w.]+)/.exec(ua)
    || ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)
    || [];

// ie11 support
// ie11 ua change: http://msdn.microsoft.com/zh-cn/library/ie/hh869301(v=vs.85).aspx
let matchIe11;
if (ua.indexOf('trident') > -1 && (matchIe11 = /rv:([\d.]+)/.exec(ua))) {
    match[1] = 'msie';
    match[2] = matchIe11[1];
}

// edge support
// edge ua change: http://msdn.microsoft.com/zh-cn/library/ie/hh869301(v=vs.85).aspx
let matchEdge;
if ((matchEdge = /edge\/([\d.]+)/.exec(ua))) {
    match[1] = 'edge';
    match[2] = matchEdge[1];
}

matched = {
    browser: match[1] || '',
    version: match[2] || '0'
};

if (matched.browser) {
    exports[matched.browser] = true;
    exports.version = matched.version;
}

// Chrome is Webkit, but Webkit is also Safari.
if (exports.chrome) {
    exports.webkit = true;
}
else if (exports.webkit) {
    exports.safari = true;
}

let isIE = exports.msie;
let majorVersion = parseInt(exports.version, 10);
/*eslint-disable */

// Mobile detect
let isMobile = exports.isMobile = ua.match(/(nokia|iphone|android|motorola|^mot\-|softbank|foma|docomo|kddi|up\.browser|up\.link|htc|dopod|blazer|netfront|helio|hosin|huawei|noletra|CoolPad|webos|techfaith|palmsource|blackberry|alcatel|amoi|ktouch|nexian|samsung|^sam\-|s[cg]h|^lge|ericsson|philips|sagem|wellcom|bunjalloo|maui|symbian|smartphone|midp|wap|phone|windows ce|iemobile|^spice|^bird|^zte\-|longcos|pantech|gionee|^sie\-|portalmmm|jig\s browser|hiptop|^ucweb|^benq|haier|^lct|opera\s*mobi|opera\*mini|320x320|240x320|176x220)/i);

/*eslint-enable */
/**
 * Whether it's window
 * @property isWin
 */
exports.isWin = /windows|win32/.test(ua);

/**
 * Whether it's mac
 * @property isMac
 */
exports.isMac = /Mac/.test(ua);

/**
 * Whether it's iOS
 * @property isIOS
 */
exports.isIOS = /(?:iphone|ipad|ipod)/i.test(ua);

/**
 * Whether it's android
 * @property isAndroid
 */
exports.isAndroid = /android/i.test(ua);

/**
 * Browser name
 * @property browser
 */
exports.browser = matched.browser || '';

/**
 * Browser's big version, like IE 9.0.8812.1621, its big version is integer 9
 * @property majorVersion
 */
exports.majorVersion = majorVersion;

/**
 * Whether it's IE or not
 * @property isIE
 */
exports.isIE = isIE;

/**
 * Whether it's IE6 or not
 * @property isIE6
 */
exports.isIE6 = isIE && majorVersion === 6;

/**
 * Whether it's IE9 or not
 * @property isIE9
 */
exports.isIE9 = isIE && majorVersion === 9;

/**
 * Whether it's IE9 or below, including IE6, IE7, IE8
 * @property isIE9Below
 */
exports.isIE9Below = isIE && majorVersion < 9;

exports.isMobile = isMobile;

/**
 * Whether it's Edge or not
 * @property isEdge
 */
exports.isEdge = exports.edge;
