var path = require('path');
delete require.cache[require.resolve('./_ivrNodes')];

module.exports = {
    req: {
        ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
    },
    set: {
        'current': '10004',
        'available' : [
            {'id': '10003', 'name': '企点服务', 'url': '/mng/account/info'},
            {'id': '10005', 'name': '企点电话', 'url': '/mng/account/info'},
            {'id': '10004', 'name': '企点分析', 'url': '/mng/account/info'}
        ]
    },
    info: {
        nameAccount: 2852199100,
        kfuin: 2852199100,
        name: 'Guest',
        face: '',
        mobile: '',
        loginUin: 2852199100,
        loginFace: '',
        loginName: '',
        isAdmin: 1
    },
    nav: {
        headers: [{
            name: '社媒管理',
            url: 'https://oaadmin.qidian.qq.com/mp/imgTxtMaterial',
            openNew: 0,
            isSelected: 0
        }, {
            name: '推广分析',
            url: 'https://oaadmin.qidian.qq.com/ea/daTrack/index',
            openNew: 0,
            isSelected: 1
        }, {
            name: '销售接待',
            url: 'https://oaadmin.qidian.qq.com/tp/wpa',
            openNew: 0,
            isSelected: 0
        }, {
            name: '通讯录',
            url: 'https://oaadmin.qidian.qq.com/cc/callContacts',
            openNew: 0,
            isSelected: 0
        }, {
            name: '客户库',
            url: 'https://oaadmin.qidian.qq.com/cl/CustomerClone',
            openNew: 0,
            isSelected: 0
        }, {
            name: '管理',
            url: 'https://oaadmin.qidian.qq.com/mng/org',
            openNew: 0,
            isSelected: 0
        }]
    },
    menu: [],
    notContentFull: true,
    data: {
        canAddTTS: true,
        testingIvr: { // 此处为该ivr的测试信息
            ivrId: '0001',
            switchboard: '', // 最近一次绑定的测试总机号码
            phone: '15121017340',
            expireTime: 321321321321,
            expired: true
        },
        readOnly: false,
        notContentFull: true,
        corpPhoneList1: ['+00861091912955', '00861053767562', '00861053767563', '00861053767564', '00861053767561'],
        robotPermited: true,
        ivrId: '123123',
        ivrName: 'dsadsa',
        ivrDesc: 'IVR的描述信息',
        initIvrNodeID: 2641,
        createTime: 1497008542,
        modifyTime: 1497008542,
        modifyAuthor: '0067ED',
        ivrNodes: require('./_ivrNodes')
    },
    branch: 'trunk'
};
