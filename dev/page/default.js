module.exports = {
    req: {
        ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36'
            + '(KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
    },
    info: {
        nameAccount: 2852199100,
        kfuin: 2852199100,
        name: 'Guest',
        face: '',
        mobile: '',
        loginUin: 2852372556,
        loginFace: '',
        loginName: '',
        isAdmin: 0
    },
    set: {
        current: '10018',
        currentClass: 'ea',
        available: [
            {id: '10003', name: '企点服务', url: '/mng/account/info', className: 'fw', type: 'fw'},
            {id: '10002', name: '企点服务', url: '/mng/account/info', className: 'fw', type: 'xt'},
            {id: '10005', name: '企点电话', url: '/mng/account/info', className: 'cc', type: 'cc'},
            {id: '10004', name: '企点分析', url: '/mng/account/info', className: 'ea', type: 'ea'},
            {id: '10010', name: '企点营销', url: '/mng/account/info', className: 'yx', type: 'yx'}
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
            isSelected: 0,
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
        name: '话务报表',
        subMenu: [{
            id: 117,
            nav: '推广分析',
            name: '通话概览',
            url: '/call/report/summary',
            isSelected: 1,
            isExpanded: 1,
            className: 'icon-nav-wxPromotionMng',
            openNew: 0,
            isNew: 0
        }, {
            id: 120,
            nav: '推广分析',
            name: '呼损分析',
            url: '/call/report/call_lost',
            isSelected: 0,
            isExpanded: 1,
            className: 'icon-nav-propagationAna',
            openNew: 0,
            isNew: 0
        }, {
            id: 121,
            nav: '推广分析',
            name: '技能组分析',
            url: '/call/report/skill_group',
            isSelected: 0,
            isExpanded: 1,
            className: 'icon-nav-propagationAna',
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
    }, {
        name: '线索管理',
        subMenu: [{
            id: 462,
            nav: '推广分析',
            name: '线索库',
            url: '/ea/customer/leads/index',
            isSelected: 0,
            isExpanded: 1,
            className: 'icon-nav-saleStore',
            openNew: 0,
            isNew: 0
        }, {
            id: 474,
            nav: '推广分析',
            name: '线索评分应用',
            url: '/ea/customer/rule/index',
            isSelected: 0,
            isExpanded: 1,
            className: 'icon-nav-leadsScore',
            openNew: 0,
            isNew: 0
        }]
    }, {
        name: '人群管理',
        subMenu: [{
            id: 463,
            nav: '推广分析',
            name: '人群包',
            url: '/ea/crowd/package/index',
            isSelected: 0,
            isExpanded: 1,
            className: 'icon-nav-crowdpac',
            openNew: 0,
            isNew: 0
        }]
    }, {
        name: '客户评估',
        subMenu: [{
            id: 464,
            nav: '推广分析',
            name: '价值评分规则',
            url: '/call/settings/scores/score',
            isSelected: 0,
            isExpanded: 1,
            className: 'icon-nav-call_valueCount',
            openNew: 0,
            isNew: 0
        }]
    }],
    data: {
        intelligentRule: true,
        wsdRule: true,
        siteType: 'ea',
        filterCache: {
            'skill-group-tab0': ['callout', 'avg_call_time']
        },
        corpPhoneList: [
            // {
            //     value: '+00861091912955',
            //     callIn: true,
            //     callOut: false
            // }, {
            //     value: '+00861053767563',
            //     callIn: false,
            //     callOut: true
            // }, {
            //     value: '+00861053767562',
            //     callIn: true,
            //     callOut: true
            // }, {
            //     value: '+00861053767561',
            //     callIn: false,
            //     callOut: false
            // }
        ],
        corpPhoneGroup: [
            // {
            //     id: 1,
            //     name: '售前客服售前客服售前',
            //     tel: ['+862022953031', '+862022953032', '+862022953033']
            // }, {
            //     id: -1,
            //     name: '未分组总机',
            //     tel: ['+862022953041', '+862022953042', '+862022953043', '+862022953044', '+862022953045', '+862022953046', '+862022953047', '+862022953048', '+862022953049']
            // }, {
            //     id: 2,
            //     name: '售后客服售后客服售后',
            //     tel: ['+862022953051', '+862022953052', '+862022953053', '+862022953054', '+862022953055']
            // }
        ],
        // 呼叫类型-通话结果
        callDescriptionList: {
            1: [
                {
                    value: 4,
                    label: '客户语音导航挂机'
                },
                {
                    value: 5,
                    label: '客户排队放弃'
                },
                {
                    value: 6,
                    label: '客户振铃放弃'
                },
                {
                    value: 7,
                    label: '呼损'
                },
                {
                    value: 1,
                    label: '接通'
                }
            ],
            2: [
                {
                    value: 3,
                    label: '坐席未接通'
                },
                {
                    value: 2,
                    label: '客户未接通'
                },
                {
                    value: 1,
                    label: '接通'
                }
            ],
            3: [
                {
                    value: 2,
                    label: '客户未接通'
                },
                {
                    value: 4,
                    label: '客户语音导航挂机'
                },
                {
                    value: 5,
                    label: '客户排队放弃'
                },
                {
                    value: 6,
                    label: '客户振铃放弃'
                },
                {
                    value: 7,
                    label: '呼损'
                },
                {
                    value: 1,
                    label: '接通'
                }
            ],
            4: [
                {
                    value: 3,
                    label: '坐席未接通'
                },
                {
                    value: 2,
                    label: '客户未接通'
                },
                {
                    value: 1,
                    label: '接通'
                }
            ],
            6: [
                {
                    value: 3,
                    label: '坐席未接通'
                },
                {
                    value: 1,
                    label: '接通'
                }
            ],
            all: [
                {
                    value: 1,
                    label: '接通'
                },
                {
                    value: 2,
                    label: '客户未接通'
                },
                {
                    value: 3,
                    label: '坐席未接通'
                },
                {
                    value: 4,
                    label: '客户语音导航挂机'
                },
                {
                    value: 5,
                    label: '客户排队放弃'
                },
                {
                    value: 6,
                    label: '客户振铃放弃'
                },
                {
                    value: 7,
                    label: '呼损'
                }
            ]
        },
        callTypes: [
            {text: '全部通话类型', value: 'all'},
            {text: '客户直接呼入', value: '1'},
            {text: '客户接待组件呼入', value: '4'},
            {text: '员工外呼', value: '2'},
            {text: '自动外呼', value: '3'},
            {text: '企业内部通话', value: '6'}
        ],
        // 通话操作
        callActionTypeList: [
            {text: '全部通话操作', value: 'all'},
            {text: '转接', value: '1'},
            {text: '咨询', value: '2'},
            {text: '转移', value: '3'},
            {text: '三方会话', value: '4'},
            {text: '监听', value: '5'},
            {text: '强拆', value: '6'},
            {text: '强插', value: '7'},
            {text: '未发生转接', value: '-1'}
        ],
        // 智能规则
        __intelligentRule: 1
    },
    branch: 'trunk'
};
