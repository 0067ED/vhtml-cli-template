function isAvailableInfo(info) {
    // 返回当前子站的信息
    if (window.PAGE_DATA && window.PAGE_DATA.set && window.PAGE_DATA.set.available) {
        for (let i = 0, len = window.PAGE_DATA.set.available.length; i < len; ++i) {
            if (window.PAGE_DATA.set.available[i].type === info) {
                return true;
            }
        }
    }
    return false;
}

export default isAvailableInfo;
