/**
 * Speed Report
 * @author: erwinqiu
 * @version: 1.0.0
 * @date: 2017/07/31
 */
import report from './report';

let reportHttpUrl = 'http://report.huatuo.qq.com/report.cgi';
let reportHttpsUrl = 'https://report.huatuo.qq.com/report.cgi';
let finalReportUrl = location.protocol.indexOf('https') !== -1 ? reportHttpsUrl : reportHttpUrl;
let env = location.hostname.substr(0, location.hostname.indexOf('.'));
let flagMapping = {
    oaadmin: 21812,
    admin: 21805
}; // 21805: 线上环境， 21812: 测试环境

let monitorConfig = {
    appId: 20255,
    flag1: flagMapping[env] || '',
    flag2: 1
};

let _ta = [
    'navigationStart',
    'unloadEventStart',
    'unloadEventEnd',
    'redirectStart',
    'redirectEnd',
    'fetchStart',
    'domainLookupStart',
    'domainLookupEnd',
    'connectStart',
    'connectEnd',
    'requestStart', // 10
    'responseStart',
    'responseEnd',
    'domLoading',
    'domInteractive',
    'domContentLoadedEventStart',
    'domContentLoadedEventEnd',
    'domComplete',
    'loadEventStart',
    'loadEventEnd'
];

// 下面三个参数是
let routerLeaveTime;
let pageShowTime;
let pageReadyTime;
let performance = window.performance || window.webkitPerformance || window.msPerformance;

let now = () => {
    return Math.floor(performance.now && performance.now() || Date.now());
};

let reportReq = function (isRoute) {
    // 开发环境跟本地环境不上报
    if (!monitorConfig.flag1) {
        return;
    }
    let appId = monitorConfig.appId;
    let f1 = monitorConfig.flag1;
    let f2 = monitorConfig.flag2;
    let f3_ie = isRoute ? 2 : 1;
    let f3_c = isRoute ? 2 : 1;
    let _t;
    let _p = window.performance || window.webkitPerformance || window.msPerformance;
    let _da = [];
    let _t0;
    let _tmp;
    let f3 = f3_ie;
    if (_p && (_t = _p.timing)) {
        if (typeof (_t.msFirstPaint) !== 'undefined') {   // ie9
            _ta.push('msFirstPaint');
        }
        else {
            if (f3_c) {
                f3 = f3_c;
            }
        }
        if (isRoute) {
            _t0 = routerLeaveTime;
        }
        else {
            _t0 = _t[_ta[0]];
            for (let i = 1, l = _ta.length; i < l; i++) {
                _tmp = _t[_ta[i]];
                _tmp = (_tmp ? (_tmp - _t0) : 0);
                if (_tmp > 0) {
                    _da.push(i + '=' + _tmp);
                }
            }
        }
        // pageShowTime - _t0 > 0， 是因为pageShowTime用的是performance.now，而_t0则是Date.now
        _da.push(`28=${pageShowTime - _t0 > 0 ? pageShowTime - _t0 : pageShowTime}`);
        _da.push(`29=${pageReadyTime - _t0 > 0 ? pageReadyTime - _t0 : pageReadyTime}`);

        let url = finalReportUrl;
        let speedparams = encodeURIComponent('flag1=' + f1 + '&flag2=' + f2 + '&flag3=' + f3 + '&' + _da.join('&'));
        url += '?appid=' + appId + '&speedparams=' + speedparams;
        report(url);
    }
};

let routeLeave = () => {
    routerLeaveTime = now();
};

let pageReady = () => {
    pageReadyTime = now();
    if (routerLeaveTime) {
        reportReq(true);
    }
    else {
        reportReq();
    }
};

let pageShow = () => {
    pageShowTime = now();
    return pageShowTime - routerLeaveTime;
};

export default {
    routeLeave,
    pageReady,
    pageShow
};
