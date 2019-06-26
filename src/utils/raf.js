const vendors = ['', 'ms', 'moz', 'webkit', 'o'];
const rafKey = vendors.reduce((result, vendor) => {
    if (result) {
        return result;
    }

    const key = `${vendor}${vendor ? 'R' : 'r'}equestAnimationFrame`;
    if (typeof window[key] === 'function') {
        return key;
    }
}, null);

export default function raf(callback) {
    if (rafKey) {
        window[rafKey](callback);
    }
    else {
        window.setTimeout(callback, 1000 / 60);
    }
}
