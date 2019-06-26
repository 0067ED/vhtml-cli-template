import axios from 'axios';
import Vue from 'vue';
import cookie from './cookie';
import eventBus from './bus';
import LoginBase from '../components/Login.vue';

const CancelToken = axios.CancelToken;
const NonCatchErrorCgiList = [ // 在这个队列中的cgi，在axios的catch逻辑不做任何处理（不想让用户有任何提示感知）
    '/star4s/questions/state'
];

if (!Vue.prototype.$ajax) {

    const CSRF_KEY = '_bqq_csrf';
    const UNIQUE_KEY = '_t';

    let lastRequestSettings = [];
    let going = false;
    let _uniqueId = 0;
    // let hold;
    let parse = function (str) {
        let data = {};
        let p = str.split('&');
        p.forEach(item => {
            item = item.split('=');
            data[item[0]] = item[1];
        });
        return data;
    };

    let isNonCatchErrorCgi = function (url) {
        return NonCatchErrorCgiList.includes(url);
    };

    let wrapError = function (data) {
        let err = new Error();
        let res;

        if (data.response) {
            res = typeof data.response.data === 'object' ? data.response.data : {};
            res.status = data.response.status;
        }
        else {
            res = {
                msg: data.message
            };
        }

        err.cancel = axios.isCancel(data);
        err.code = res.code;
        err.msg = err.message = res.msg || res.message;
        // copy http status
        err.status = res.status;

        // backsend data
        res.data && (err.data = res.data);

        // backsend extra
        res.extra && (err.extra = res.extra);

        // 登录超时，自动记录请求
        if (err.status === 508 && !data.config.ignore) {
            lastRequestSettings.push(data.config);
        }

        return err;
    };

    let request = function (config) {
        let locale = localStorage.getItem('qidianLocale');
        if (locale) {
            config.headers['Accept-Language'] = locale;
        }
        config._uniqueId = ++_uniqueId;
        eventBus.$emit('request_start', config._uniqueId);
        let defer = new Promise((resolve, reject) => {
            config.promise = {resolve, reject};
            axios.request(config).then((data) => {
                eventBus.$emit('request_end', config._uniqueId);
                resolve(data);
            }).catch((error) => {
                eventBus.$emit('request_end', config._uniqueId);
                error && error.status !== 508 && reject(error);
            });
        });
        return defer;
    };

    axios.interceptors.request.use(function (config) {
        // add timestamp for get request, to avoid 304
        if (config.method === 'get') {
            config.params = config.params || {};
            config.params[UNIQUE_KEY] = Date.now();
        }

        let csrf = cookie.get(CSRF_KEY);
        if (csrf) {
            switch (config.method) {
                case 'get':
                case 'delete':
                case 'head':
                case 'options':
                    config.params = config.params || {};
                    config.params[CSRF_KEY] = csrf;
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
                            // data数据在服务那边处理后变成了 name=val&...形式
                            config.data = parse(str);
                        }
                    }
                    config.data[CSRF_KEY] = csrf;
                    break;
                default:
                    break;
            }
        }

        return config;
    });

    axios.interceptors.response.use(function (res) {

        return res.data;

    }, function (error) {
        let url = error.config.url;

        // cgi的url在非捕获错误列表中时，中断后续逻辑执行
        if (isNonCatchErrorCgi(url)) {
            error.config.ignore = true;
            return Promise.reject(wrapError(error));
        }

        error = wrapError(error);

        // 这里兼容下服务的接口返回数据
        // 服务那边只要code === 3就表示登录态过期
        if (/\/(tp|cl)\//.test(url)) {
            if (error.code === 3) {
                error.status = 508;
            }
            else {
                error.status = 608;
            }
        }

        // 企点的登录态超时
        if (error.status === 508) {
            if (!window.loginPanel) {
                let Login = Vue.extend(LoginBase);
                window.loginPanel = new Login({el: '#login-placeholder'});
            }

            window.loginPanel.source = 'ajax';
            window.loginPanel.open();

            return Promise.reject(error);

        }
        else if (error.code === 3) {
            window.location = '/mp/register';

        }
        else if (error.status === 501) {
            error.msg = error.msg || '输入包含非法字符，请修改后重试';
            return Promise.reject(error);
        }
        else if (!error.cancel && (error.status === 500 || error.code === void 0 || error.code === 100)) {
            Vue.prototype.$message.error(error.msg || '服务器出错了');
            return Promise.reject(error);
        }

        return Promise.reject(error);
    });

    // 继续上次请求，如登录态续期后继续发起请求
    axios.goon = function () {
        let len = lastRequestSettings.length;
        let defers = [];
        let config;

        if (len === 0 || going) {
            return;
        }

        // 防止同组ajax的goon多次触发
        going = true;
        for (let i = 0; i < len; i++) {
            // 重发的请求不再存储参数
            config = lastRequestSettings[i];
            config.ignore = true;

            (function (config) {
                let defer = axios.request(config);
                defer.then((data) => {
                    config.promise.resolve(data);
                }, (error) => {
                    error && error.status !== 508 && config.promise.reject(error);
                });

                defers.push(defer);
            })(config);

        }

        Promise.all(defers).then(() => {
            lastRequestSettings = [];
            going = false;
        }).catch(() => {
            going = false;
        });

        return axios;
    };

    let methods = ['get', 'delete', 'head', 'options', 'post', 'put', 'patch', 'read', 'create', 'update'];

    methods.map(method => {
        axios[method] = function (url, config = {}, moreConfig = {}) {
            let data;
            let defer;
            let source = CancelToken.source();
            let cancel = function () {
                source.cancel();
            };

            if ('create|read|update|delete'.indexOf(method) !== -1) {
                const methodsMap = {
                    create: 'post',
                    read: 'get',
                    update: 'put',
                    delete: 'delete'
                };
                if ('read|delete'.indexOf(method) !== -1) {
                    moreConfig.params = config;
                }
                else {
                    moreConfig.data = config;
                }
                moreConfig.method = methodsMap[method] || 'post';
                moreConfig.url = url;
                moreConfig.headers = {'X-Requested-With': 'XMLHttpRequest'};
                moreConfig.cancelToken = source.token;
                defer = request(moreConfig);
                defer.cancel = cancel;
                return defer;
            }

            if ('post|put|patch'.indexOf(method) !== -1) {
                data = config;
                config = arguments[2] || {};
            }

            config.method = method;
            config.url = url;
            config.data = data;
            config.headers = {'X-Requested-With': 'XMLHttpRequest'};
            config.cancelToken = source.token;

            defer = request(config);
            defer.cancel = cancel;
            return defer;
        };
    });

    Vue.prototype.$ajax = axios;
}

export default Vue.prototype.$ajax;
