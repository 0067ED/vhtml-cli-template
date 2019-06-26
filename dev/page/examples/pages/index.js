let config = {
    req: {
        ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36'
    },
    info: {
        nameAccount: '2852199100',
        kfuin: '2852199100',
        name: 'Guest',
        face: '',
        mobile: '',
        loginUin: '2852199100',
        loginFace: '',
        loginName: '',
        isAdmin: 1
    },
    nav: {
        headers: [{
            name: 'EXAMPLES',
            url: 'https://oaadmin.qidian.qq.com/mp/imgTxtMaterial',
            openNew: 0,
            isSelected: 0
        }]
    },
    menu: [{
        name: 'component',
        subMenu: []
    }],
    data: {},
    branch: 'trunk'
};

let components = require('../../../../src/components/components.json');
let id = 1;

for (let name in components) {
    config.menu[0].subMenu.push({
        id: ++id,
        nav: name,
        name: name,
        url: components[name],
        isSelected: 0,
        isExpanded: 1,
        openNew: 0,
        isNew: 0
    });
}

module.exports = config;
