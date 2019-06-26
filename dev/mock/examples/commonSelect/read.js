const faker = require('faker');
faker.locale = 'zh_CN';

function fakeItem() {
    return {
        id: faker.random.uuid(),
        name: faker.name.findName()
    };
}

function _fakeItemList(count) {
    const result = [];
    if (count === -1) {
        count = Math.floor(Math.random() * 20);
    }
    while (count > 0) {
        result.push(fakeItem());
        count--;
    }
    return result;
}

function fakeItemList(index, count) {
    return _fakeItemList(index < 4 ? count : 0);
}
module.exports = function (params) {
    const index = +params.index;
    const count = +params.count;

    const records = fakeItemList(index, count);

    return {
        statusCode: 200,
        body: {
            code: 1,
            data: {
                records: records
            },
            msg: '服务器出错了'
        }
    };

};
