module.exports = function (req) {
    return {
        statusCode: 200,
        body: {
            code: 0,
            data: {
                records: [
                    {
                        pv: 100,
                        uv: 9000,
                        count: 1000,
                        time: 30000,
                        percent: 0.33
                    }
                ]
            }
        }
    };
};
