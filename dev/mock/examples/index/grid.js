const data = [];
for (let i = 0; i < 15; ++i) {
    data.push({
        name: 'erwin',
        date: +new Date(),
        math: parseInt(Math.random() * 100, 10),
        english: parseInt(Math.random() * 100, 10),
        cpp: parseInt(Math.random() * 100, 10),
        sql: parseInt(Math.random() * 100, 10),
        pv: parseInt(Math.random() * 100, 10),
        uv: parseInt(Math.random() * 100, 10),
        vv: parseInt(Math.random() * 100, 10),
        ip: parseInt(Math.random() * 100, 10),
        newVisitCount: parseInt(Math.random() * 100, 10),
        newVisitRate: parseInt(Math.random() * 100, 10),
        br: parseInt(Math.random() * 100, 10),
        avgTime: parseInt(Math.random() * 100, 10),
        avgPage: parseInt(Math.random() * 100, 10)
    });
}

module.exports = function (req) {
    console.log('test grid:', req.params.index);
    return {
        statusCode: 200,
        body: {
            data: {
                records: req.params.index === 4 ? [] : data,
                total: req.params.index === 4 ? 45 : 150
            }
        }
    };
};
