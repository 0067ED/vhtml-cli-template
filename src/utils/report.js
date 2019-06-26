/**
 * @send report as an img
 * @author erwinqiu
 * @version 1
 * Created: 2017-08-01
 */
var logs = {};

/**
 * Report to a url
 * @param {String} url Report destination. All data should be serialized and add tu search part of url
 * @chainable
 */
export default (url) => {
    // send data
    let now = +new Date();
    let name = 'log_' + now;
    let img = logs[name] = new Image();

    img.onload = img.onerror = function () {
        logs[name] = null;
    };

    url += (url.indexOf('?') > -1 ? '&' : '?') + now;

    img.src = url;

    // return arguments.callee;
};
