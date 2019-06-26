import '../utils/ajax';

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
            if (!that._fetching) {
                that._fetching = true;
                that._promises = [];
                that._param = {
                    req: []
                };
                // that._param.req = [];
                setTimeout(function () {
                    that._fetching = false;
                    let promises = that._promises;
                    that._promises = null;
                    that._param.req = JSON.stringify(that._param.req);

                    that.$ajax.post(url, that._param)
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
            that._param.req.forEach((item, index) => {
                if (!that.sameRequest(item, params)) {
                    req.push(item);
                    promises.push(that._promises[index]);
                }
            });
            req.push(params);
            promises.push(reportPromise);
            that._param.req = req;
            that._promises = [].concat(promises);

            return reportPromise.promise;
        }
    }
};
