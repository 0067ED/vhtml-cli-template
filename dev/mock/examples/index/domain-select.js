module.exports = function (req) {
    return {
        statusCode: 200,
        body: {
            code: 0,
            data: {
                customized: [{
                    domain: 'a.com',
                    name: '名称1',
                    appid: 'sdadshjashdkjsa'
                }, {
                    domain: 'b.com',
                    name: '名称2',
                    appid: 'sdadshjashdkjsa2'
                }],
                fengling: [{
                    domain: 'c.com',
                    name: '名称3',
                    appid: 'sdadshjashdkjsa3'
                }, {
                    domain: 'ddddddddddddddddddddddddddddddddddddddddddddd.com',
                    name: '名称4',
                    appid: 'sdadshjashdkjsa4'
                }, {
                    domain: 'e.com',
                    name: '名称5',
                    appid: 'sdadshjashdkjsa5'
                }, {
                    domain: 'f.com',
                    name: '名称6',
                    appid: 'sdadshjashdkjsa6'
                }, {
                    domain: 'g.com',
                    name: '名称7',
                    appid: 'sdadshjashdkjsa7'
                }, {
                    domain: 'h.com',
                    name: '名称8',
                    appid: 'sdadshjashdkjsa8'
                }, {
                    domain: 'i.com',
                    name: '名称9',
                    appid: 'sdadshjashdkjsa9'
                }]
            }
        }
    };
};
