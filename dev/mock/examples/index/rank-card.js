module.exports = function (req) {
    return {
        statusCode: 200,
        body: {
            code: 0,
            data: {
                records: [
                    {
                        'asvc-count': 1987,
                        'asvc-total': 20987,
                        'pcc-count': 3476,
                        'pcc-total': 20987,
                        'ccc-count': 1000,
                        'ccc-total': 20987,
                        'crcc-count': 123241,
                        'crcc-total': 123241
                    }
                ]
            }
        }
    };
};