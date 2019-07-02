import axios from 'axios';

axios.defaults.baseURL = '/';
// 当为以下 http 状态码时，进入 response 响应处理流程
axios.defaults.validateStatus = status => {
    return [200, 500].indexOf(status) >= 0;
};

let parse = function (str) {
    let data = {};
    let p = str.split('&');
    p.forEach(item => {
        item = item.split('=');
        data[item[0]] = item[1];
    });
    return data;
};

axios.interceptors.request.use(function (config) {
    if (config.method === 'get') {
        config.params = config.params || {};
    }

    switch (config.method) {
        case 'get':
        case 'delete':
        case 'head':
        case 'options':
            config.params = config.params || {};
            break;
        case 'post':
        case 'put':
        case 'patch':
            config.data = config.data || {};
            if (typeof config.data === 'string') {
                let str = config.data;
                try {
                    config.data = JSON.parse(str);
                }
                catch (e) {
                    config.data = parse(str);
                }
            }
            break;
        default:
            break;
    }

    return config;
});

axios.interceptors.response.use(function (response) {
    // 如果状态码不是 200 ，准备抛出错误，错误来自于响应内容中的 msg ，同时响应中的错误代码，会挂到 err 对象的 code 值中
    if (response.status !== 200) {
        let msg = '请求发生错误';
        let code = response.status;
        if (response.data && response.data.msg) {
            msg = response.data.msg;
        }
        if (response.data && response.data.code) {
            code = response.data.code;
        }
        let err = new Error(msg);
        // 错误对象加入错误代码
        err.statusCode = err.status = err.code = code;
        return Promise.reject(err);
    }
    return response.data;
}, function (error) {
    return Promise.reject(error);
});
Vue.prototype.$ajax = axios;

export default Vue.prototype.$ajax;
