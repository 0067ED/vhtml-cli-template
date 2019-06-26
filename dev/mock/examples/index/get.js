module.exports = function (req) {
    return {
        statusCode: 200,
        body: {
            code: 0,
            data: {
                name: 'name',
                score: 'score',
                customInput: 'custom',
                customSingleSelect: 'Shanghai',
                customMultiSelect: ['Beijing'],
                customDatePicker: [
                    Math.floor(new Date().getTime() / 1000),
                    Math.floor(new Date().getTime() / 1000) + 48 * 3600
                ]
            },
            msg: 'test'
        }
    };
};
