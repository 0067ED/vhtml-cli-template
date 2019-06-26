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
        notContentFull: true
    },
    branch: 'trunk'
};
