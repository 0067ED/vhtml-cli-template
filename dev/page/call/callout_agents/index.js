module.exports = {
    req: {
        ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
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
    set: {
        "current": "10004",
        "available" : [
            {"id": "10003", "name": "企点服务", "url": "/mng/account/info"},
            {"id": "10005", "name": "企点电话", "url": "/mng/account/info"},
            {"id": "10004", "name": "企点分析", "url": "/mng/account/info"}
        ]
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
            url: 'https://oaadmin.qidian.qq.com/call/callContacts',
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
    menu: [{
        name: '满意度',
        subMenu: [{
            id: 105,
            nav: '推广分析',
            name: '满意度设置',
            url: '/call/settings/satisfaction',
            isSelected: 0,
            isExpanded: 1,
            className: 'icon-nav-adTrack',
            openNew: 0,
            isNew: 0
        }, {
            id: 109,
            nav: '推广分析',
            name: '接待分组',
            url: '/call/settings/receptiongroup/index',
            isSelected: 1,
            isExpanded: 1,
            className: 'icon-nav-searchTrack',
            openNew: 0,
            isNew: 0
        }, {
            id: 110,
            nav: '推广分析',
            name: '接待详情',
            url: '/call/settings/receptiongroup/detail',
            isSelected: 0,
            isExpanded: 1,
            className: 'icon-nav-flowAnalyse',
            openNew: 0,
            isNew: 0
        }]
    }, {
        name: '通话报表',
        subMenu: [{
            id: 117,
            nav: '推广分析',
            name: '通话概览',
            url: '/call/report/summary',
            isSelected: 0,
            isExpanded: 1,
            className: 'icon-nav-wxPromotionMng',
            openNew: 0,
            isNew: 0
        }, {
            id: 118,
            nav: '推广分析',
            name: '员工分析',
            url: '/call/report/employee',
            isSelected: 0,
            isExpanded: 1,
            className: 'icon-nav-wxPromotionAna',
            openNew: 0,
            isNew: 0
        }, {
            id: 119,
            nav: '推广分析',
            name: '通话记录',
            url: '/call/calldetail/callrecord',
            isSelected: 0,
            isExpanded: 1,
            className: 'icon-nav-propagationAna',
            openNew: 0,
            isNew: 0
        }]
    }],
    data: {
        pageType: 'blank-page'
    },
    branch: 'trunk'
};
