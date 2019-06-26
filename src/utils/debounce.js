function debounce(callback, duration) {
    let timeout;
    return function () {
        if (timeout) {
            window.clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            timeout = null;
            callback.apply(this, arguments);
        }, duration);
    };
}

export default debounce;
