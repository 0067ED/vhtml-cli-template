/**
 * Get the offset parent
 * @param {Element} element original element.
 * @return {Element} offset parent
 */
export function getOffsetParent(element) {
    const offsetParent = element.offsetParent;
    const nodeName = offsetParent && offsetParent.nodeName.toLowerCase();

    if (!nodeName || nodeName === 'body' || nodeName === 'html') {
        return window.document.documentElement;
    }

    return offsetParent;
}

/**
 * Get computed CSS style
 * @param {Element} element element
 * @param {string=} property css property
 * @return {string|Object} css style value.
 */
export function getComputedStyle(element, property) {
    if (element.nodeType !== 1) {
        return [];
    }

    const css = window.getComputedStyle(element, null);
    return property
        // https://github.com/jquery/jquery/blob/473d2ea7d5e4ef0a5b8e0305197f483c136ee4ab/src/css/curCSS.js#L21
        // getPropertyValue is needed for:
        //   util.getComputedStyle(element, 'filter') (IE 9 only, #12537)
        //   util.getComputedStyle(element, '--customProperty) (#3144)
        ? (css.getPropertyValue(property) || css[property])
        : css;
}

/**
 * get absolute rect of an element element
 * @param {Element|string} element dom element or 'html'.
 * @return {Object} rect value
 */
export function getRect(element) {
    let rect;
    if (element === 'viewport') {
        const scrollTop = getScrollTop();
        const scrollLeft = getScrollLeft();
        const viewWidth = getViewWidth();
        const viewHeight = getViewHeight();
        return {
            top: scrollTop,
            left: scrollLeft,
            right: scrollLeft + viewWidth,
            bottom: scrollTop + viewHeight,
            width: viewWidth,
            height: viewHeight
        };
    }

    if (element === 'html' || element.nodeName === 'HTML') {
        const pageWidth = getPageWidth();
        const pageHeight = getPageHeight();

        // viewport
        rect = {
            top: 0,
            left: 0,
            right: pageWidth,
            bottom: pageHeight,
            width: pageWidth,
            height: pageHeight
        };
        return rect;
    }

    const isIE10 = window.navigator.appVersion.indexOf('MSIE 10') !== -1;
    if (isIE10) {
        // IE10 10 FIX: Please, don't ask, the element isn't
        // considered in DOM in some circumstances...
        // This isn't reproducible in IE10 compatibility mode of IE11
        try {
            rect = element.getBoundingClientRect();
        }
        catch (err) {
            rect = {};
        }
    }
    else {
        rect = element.getBoundingClientRect();
    }
    const win = element.ownerDocument.defaultView;
    const scrollTop = getScrollTop(win);
    const scrollLeft = getScrollLeft(win);
    const left = (rect.left || 0) + scrollLeft;
    const top = (rect.top || 0) + scrollTop;
    const width = rect.width || 0;
    const height = rect.height || 0;
    const right = left + width;
    const bottom = top + height;
    return {
        left,
        top,
        right,
        bottom,
        width,
        height
    };
}

/**
 * get width and height of an element element, which including margin.
 * @param {Element} element dom element.
 * @return {Object} rect value
 */
export function getWidthAndHeight(element) {
    const rect = {
        width: element.offsetWidth,
        height: element.offsetHeight
    };
    const styles = getComputedStyle(element);
    rect.width += parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
    rect.height += parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
    return rect;
}

export function getScrollTop(win) {
    win = win || window;
    const doc = win.document;
    return win.pageYOffset || doc.documentElement.scrollTop || doc.body.scrollTop;
}

export function getScrollLeft(win) {
    win = win || window;
    const doc = win.document;
    return win.pageXOffset || doc.documentElement.scrollLeft || doc.body.scrollLeft;
}

export function getPageHeight(win) {
    win = win || window;
    const doc = win.document;
    const body = doc.body;
    const de = doc.documentElement;
    const client = doc.compatMode === 'BackCompat' ? body : doc.documentElement;

    return Math.max(de.scrollHeight, body.scrollHeight, client.clientHeight);
}

export function getPageWidth(win) {
    win = win || window;
    const doc = win.document;
    const body = doc.body;
    const de = doc.documentElement;
    const client = doc.compatMode === 'BackCompat' ? body : doc.documentElement;

    return Math.max(de.scrollWidth, body.scrollWidth, client.clientWidth);
}

export function getViewHeight(win) {
    win = win || window;
    const doc = win.document;
    const client = doc.compatMode === 'BackCompat' ? doc.body : doc.documentElement;
    return client.clientHeight;
}

export function getViewWidth(win) {
    win = win || window;
    const doc = win.document;
    const client = doc.compatMode === 'BackCompat' ? doc.body : doc.documentElement;
    return client.clientWidth;
}

export function isOutside(inside, container, threshould) {
    threshould = threshould || 0;
    const top = inside.top - container.top - threshould;
    const left = inside.left - container.left - threshould;
    const right = container.right - inside.right - threshould;
    const bottom = container.bottom - inside.bottom - threshould;
    return (top <= 0) || (left <= 0) || (right <= 0) || (bottom <= 0);
    /*
    if ((top >= 0) && (left >= 0) && (right >= 0) && (bottom >= 0)) {
        return;
    }

    const values = {
        top,
        left,
        right,
        bottom
    };
    const directions = ['top', 'left', 'right', 'bottom'];
    directions.sort((d1, d2) => values[d1] - values[d2]);
    return directions;
    */
}

export function addClass(element, clazz) {
    if (hasClass(element, clazz)) {
        return;
    }
    element.className += ` ${clazz}`;
}

export function removeClass(element, clazz) {
    clazz = clazz.replace(/([.*+?^=!:${}()|[\]\/\\-])/g, '\\$1');
    const regexp = new RegExp(`\\s*${clazz}(?=(?:\\s|$))`, 'g');
    element.className = element.className.replace(regexp, '');
}

export function hasClass(element, clazz) {
    clazz = clazz.replace(/([.*+?^=!:${}()|[\]\/\\-])/g, '\\$1');
    const regexp = new RegExp(`\\s*${clazz}(?=(?:\\s|$))`);
    return !!element.className.match(regexp);
}

export function elementInViewport(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }

    return (
        top >= window.pageYOffset
        && left >= window.pageXOffset
        && (top + height) <= (window.pageYOffset + window.innerHeight)
        && (left + width) <= (window.pageXOffset + window.innerWidth)
    );
}

export function elementPartInViewport(el) {
    var top = el.offsetTop;
    var left = el.offsetLeft;
    var width = el.offsetWidth;
    var height = el.offsetHeight;

    while (el.offsetParent) {
        el = el.offsetParent;
        top += el.offsetTop;
        left += el.offsetLeft;
    }

    return (
        top < (window.pageYOffset + window.innerHeight)
        && left < (window.pageXOffset + window.innerWidth)
        && (top + height) > window.pageYOffset
        && (left + width) > window.pageXOffset
    );
}

/* istanbul ignore next */
export const on = (function () {
    if (document.addEventListener) {
        return function (element, event, handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false);
            }
        };
    }
    return function (element, event, handler) {
        if (element && event && handler) {
            element.attachEvent('on' + event, handler);
        }
    };
})();

/* istanbul ignore next */
export const off = (function () {
    if (document.removeEventListener) {
        return function (element, event, handler) {
            if (element && event) {
                element.removeEventListener(event, handler, false);
            }
        };
    }
    return function (element, event, handler) {
        if (element && event) {
            element.detachEvent('on' + event, handler);
        }
    };
})();

export const getScrollbarWidth = () => {
    let outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.width = '100px';
    document.body.appendChild(outer);

    var widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = 'scroll';

    // add innerdiv
    var inner = document.createElement('div');
    inner.style.width = '100%';
    outer.appendChild(inner);

    var widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
};
