'use strict';

export default function (obj) {
        // 现代浏览器可以直接使用Object.prototype.toString.call来进行undefined和null的类型判断
    if (obj === undefined) {
        return 'Undefined';
    }
    if (obj === null) {
        return 'Null';
    }

    return Object.prototype.toString.call(obj).slice(8, -1);
}
