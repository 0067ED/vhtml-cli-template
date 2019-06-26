function formatUrl(url, params) {
    let operater = url.indexOf('?') === -1 ? '?' : '&';
    if (params) {
        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                url += operater + encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
                operater = '&';
            }
        }
    }
    return url;
}

export default (params) => {
    let img = new Image();
    const url = `https://test.qidian.qq.com/report/web`;
    // const url = `https://fereport.qidian.qq.com/report/web`;
    const data = {
        ...params,
        tid: `instant_client`,
        count: 1
    };
    img.src = `${formatUrl(url, data)}&dummy=${Date.now()}`;
};
