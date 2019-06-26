
module.exports = {
    data: {
    },

    info: {
        version: 0,
        nameAccount: 938062917,
        kfuin: 8015020802,
        name: '刘慈文',
        face: 'http://placekitten.com/g/35/35',
        kfext: 1001,
        loginFace: 'http://placekitten.com/g/35/35',
        loginName: '刘慈文',
        role: '企业管理员'
    },

    nav: {
        headers: [
            {
                name: '公众号',
                url: 'https://oa.qidian.qq.com/mp',
                isSelected: 1
            },
            {
                name: '推广',
                url: 'https://oa.qidian.qq.com/mp/qf/edit',
                isSelected: 0
            },
            {
                name: '销售',
                url: 'https://oa.qidian.qq.com/tp/wpa',
                isSelected: 0
            },
            {
                name: '数据分析',
                url: 'https://oa.qidian.qq.com/da/data/?cmd=101',
                isSelected: 0
            },
            {
                name: '管理',
                url: 'https://oa.qidian.qq.com/mng/account/corpInfo',
                isSelected: 0
            }
        ]
    },

    menu: [
        {
            name: '效果监测',
            subMenu: [
                {
                    name: '落地页来源分析',
                    url: '/page/qidian/da/from.html',
                    isSelected: 0,
                    isExpanded: 1,
                    className: 'icon-nav-landing'
                },
                {
                    name: '代码部署',
                    url: '/page/qidian/da/install.html',
                    isSelected: 1,
                    isExpanded: 1,
                    className: 'icon-nav-codeDeploy'
                }
            ]
        },
        {
            name: '目标人群分析',
            subMenu: [
                {
                    name: '商圈人群分析',
                    url: '/page/qidian/group/cbd.html',
                    isSelected: 0,
                    isExpanded: 1,
                    className: 'icon-nav-business'
                },
                {
                    name: '自定义人群管理',
                    url: '/page/qidian/looksalike/mine.html',
                    isSelected: 0,
                    isExpanded: 1,
                    className: 'icon-nav-customManage'
                }
            ]
        }
    ]
};
