import '../utils/ajax';

const singleton = (function () {
    let instance;
    function init() {
        return {
            _fetching: false
        };
    }
    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    };
})();

const defer = function () {
    let resolve;
    let reject;
    let promise = new window.Promise(function () {
        resolve = arguments[0];
        reject = arguments[1];
    });
    return {
        resolve: resolve,
        reject: reject,
        promise: promise
    };
};

const getData = function (data, index) {
    return data && data.rsp && data.rsp[index];
};

export default {
    methods: {
        sameRequest(a, b) {
            return a.cid === b.cid;
        },
        fetchReport(url, params) {
            let that = this;
            let instance = singleton.getInstance();
            if (!instance._fetching) {
                instance._fetching = true;
                instance._promises = [];
                instance._param = {
                    req: []
                };
                // instance._param.req = [];
                setTimeout(function () {
                    instance._fetching = false;
                    let promises = instance._promises;
                    instance._promises = null;
                    instance._param.req = JSON.stringify(instance._param.req);

                    that.$ajax.post(url, instance._param)
                        .then(function (data) {
                            promises.map((deferPromise, index) => {
                                deferPromise.resolve(getData(data, index));
                            });
                        }, function (e) {
                            promises.map((deferPromise, index) => {
                                deferPromise.reject(e);
                            });
                        });
                }, 0);
            }
            let req = [];
            let promises = [];
            let reportPromise = defer();

            // 删除原请求队列中与现在请求的cid相同的请求及其对应的promise
            instance._param.req.forEach((item, index) => {
                if (!this.sameRequest(item, params)) {
                    req.push(item);
                    promises.push(instance._promises[index]);
                }
            });
            req.push(params);
            promises.push(reportPromise);
            instance._param.req = req;
            instance._promises = [].concat(promises);

            return reportPromise.promise;
        }
    }
};
