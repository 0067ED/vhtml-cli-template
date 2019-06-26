import browser from './browser';

let onload = browser.isIE ? function (img, ready) {
    if (typeof img.onreadystatechange !== 'undefined') {
        img.onreadystatechange = function () {
            if (/^(?:loaded|complete|undefined)$/.test(this.readyState)) {
                ready();
            }
        };
    }
    else {
        img.onload = img.onerror = ready;
    }
} : function (img, ready) {
    img.onload = img.onerror = ready;
};

let count = 0;
let imgs = {};

export default function (url, callback) {
    function ready() {
        imgs[index] = img.onreadystatechange = img.onload = null;
        callback && callback(img);
    }

    let index = count++;
    let img = imgs[index] = new Image();

    onload(img, ready);
    img.src = url;

    return img;
}
