module.exports = function (req) {
    return {
        statusCode: 200,
        body: {
            code: 0,
            data: {
                records: [
                    {
                        channel: '3',
                        uv: 100,
                        pv: 500,
                        vv: 100,
                        newVisitCount: 400
                    },
                    {
                        channel: '2',
                        uv: 200,
                        pv: 400,
                        vv: 500,
                        newVisitCount: 200
                    },
                    {
                        channel: '1',
                        uv: 300,
                        pv: 300,
                        vv: 200,
                        newVisitCount: 100
                    },
                    {
                        channel: '0',
                        uv: 500,
                        pv: 100,
                        vv: 400,
                        newVisitCount: 500
                    }
                ]
            }
        }
    };
};
