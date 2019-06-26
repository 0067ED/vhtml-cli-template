/**
 * Created by byronbinli.
 * Date: 2017/8/22.
 * Time: 19:36.
 * Content:
 */
var path = require('path');
delete require.cache[require.resolve('./_ivrNodes')];

module.exports = {
    "req": {"ua": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:51.0) Gecko/20100101 Firefox/51.0"},
    "info": {
        "nameAccount": "2852199000",
        "kfuin": "2852199000",
        "name": "Guest",
        "face": "",
        "mobile": "",
        "loginUin": "2852199000",
        "loginFace": "",
        "loginName": "",
        "isAdmin": 1
    },
    set: {
        "current": "10004",
        "available" : [
            {"id": "10003", "name": "企点服务", "url": "/mng/account/info"},
            {"id": "10005", "name": "企点电话", "url": "/mng/account/info"},
            {"id": "10004", "name": "企点分析", "url": "/mng/account/info"}
        ]
    },
    "nav": {
        "headers": [{
            "name": "社媒管理",
            "url": "https://devadmin.qidian.qq.com/mp/imgTxtMaterial",
            "openNew": 0,
            "isSelected": 0
        }, {
            "name": "推广分析",
            "url": "https://devadmin.qidian.qq.com/ea/daTrack/index",
            "openNew": 0,
            "isSelected": 0
        }, {
            "name": "数据报表",
            "url": "https://devadmin.qidian.qq.com/call/report/summary",
            "openNew": 0,
            "isSelected": 0
        }, {
            "name": "客户库",
            "url": "https://devadmin.qidian.qq.com/call/callouts/index",
            "openNew": 0,
            "isSelected": 0
        }, {
            "name": "电话设置",
            "url": "https://devadmin.qidian.qq.com/call/settings/common/voice",
            "openNew": 0,
            "isSelected": 0
        }, {
            "name": "销售接待",
            "url": "https://devadmin.qidian.qq.com/tp/wpa",
            "openNew": 0,
            "isSelected": 0
        }, {
            "name": "销售接待",
            "url": "https://devadmin.qidian.qq.com/call/settings/wpa/index",
            "openNew": 0,
            "isSelected": 0
        }, {
            "name": "客户库",
            "url": "https://devadmin.qidian.qq.com/cl/CustomerClone",
            "openNew": 0,
            "isSelected": 0
        }, {"name": "管理", "url": "https://devadmin.qidian.qq.com/mng/org", "openNew": 0, "isSelected": 0}]
    },
    "menu": [],
    "data": {
        "code": 0,
        "data": {
            "tokenUrl": "/v1/r/1450012874/qz_goods_info?transaction_id=E-170822180037306041&token_id=E-170822180037306041&pf=midas_group_pay-1000-pc-1000&out_trade_no=1599c0e8db52fc871222872",
            "openID": "2852199000_1502777538",
            "token": "E-170822180037306041",
            "sandbox": false,
            "appid": 1450012874,
            "orderCode": "1599c0e8db52fc871222872"
        },
        "msg": "ok"
    },
    "branch": "cc_branch_a"
};
