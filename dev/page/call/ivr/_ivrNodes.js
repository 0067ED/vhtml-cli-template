module.exports = [{
    "nodeId": 2793,
    "uin": "2852199351",
    "ivrId": 1228,
    "nodeName": "请求1",
    "nodeType": 7,
    "nodeProperties": {
        "method": "POST",
        "variables": ["value1", "sms001"],
        "url": "https://boss2.b.qq.com/bop/api/CustomerAgent\\\\\\",
        "self_tag": "value1",
        "succ_action": {
            "next_node": 2791,
            "next_node_is_copy": false,
            "condition": "succ"
        },
        "err_action": {
            "next_node": 3158,
            "next_node_is_copy": false,
            "condition": "err"
        },
        "sms_data": [{
            "name": "sms001",
            "value": 123
        }]
    },
    "createTime": 1503298501,
    "modifyTime": 1503372171
}, {
    "nodeId": 3265,
    "uin": "2852199351",
    "ivrId": 1228,
    "nodeName": "分支1",
    "nodeType": 8,
    "nodeProperties": {
        "play_list": [],
        "input_error_play": [],
        "field_name": "value1",
        "switch": [{
                "value": "1",
                "next_node": 9850088,
                "next_node_is_copy": false,
                "condition": "_1"
            },
            {
                "value": "2",
                "next_node": null,
                "next_node_is_copy": false,
                "condition": "_2"
            },
            {
                "value": "3",
                "next_node": 3306040,
                "next_node_is_copy": false,
                "condition": "_3"
            }
        ],
        "other_action": {
            "condition": "other",
            "next_node": null,
            "next_node_is_copy": false
        }
    },
    "createTime": 1503371270,
    "modifyTime": 1503372170
}, {
    "nodeId": 3181,
    "uin": "2852199351",
    "ivrId": 1228,
    "nodeName": "客户规则1",
    "nodeType": 9,
    "nodeProperties": {
        "rule_id": "",
        "result": [{
            "value": "high",
            "next_node": 3178,
            "next_node_is_copy": false,
            "condition": "high"
        }, {
            "value": "middle",
            "next_node": 3179,
            "next_node_is_copy": false,
            "condition": "middle"
        }, {
            "value": "low",
            "next_node": 3180,
            "next_node_is_copy": false,
            "condition": "low"
        }]
    },
    "createTime": 1503314659,
    "modifyTime": 1503372170
}, {
    "nodeId": 2642,
    "uin": "2852199351",
    "ivrId": 1228,
    "nodeName": "挂断1",
    "nodeType": 5,
    "nodeProperties": [],
    "createTime": 1503132184,
    "modifyTime": 1503372171
}, {
    "nodeId": 2733,
    "uin": "2852199351",
    "ivrId": 1228,
    "nodeName": "挂断2",
    "nodeType": 5,
    "nodeProperties": [],
    "createTime": 1503283493,
    "modifyTime": 1503372171
}, {
    "nodeId": 2639,
    "uin": "2852199351",
    "ivrId": 1228,
    "nodeName": "播音1",
    "nodeType": 1,
    "nodeProperties": {
        "play_list": [],
        "next_node": 2638,
        "finish_key": "",
        "next_node_is_copy": false,
        "condition": "default"
    },
    "createTime": 1503132120,
    "modifyTime": 1503372171
}, {
    "nodeId": 2640,
    "uin": "2852199351",
    "ivrId": 1228,
    "nodeName": "播音2",
    "nodeType": 1,
    "nodeProperties": {
        "play_list": [],
        "next_node": 2642,
        "finish_key": "",
        "next_node_is_copy": false,
        "condition": "default"
    },
    "createTime": 1503132120,
    "modifyTime": 1503372171
}, {
    "nodeId": 3182,
    "uin": "2852199351",
    "ivrId": 1228,
    "nodeName": "播音4",
    "nodeType": 1,
    "nodeProperties": {
        "play_list": [],
        "next_node": 2640,
        "finish_key": "",
        "next_node_is_copy": false,
        "condition": "default"
    },
    "createTime": 1503314659,
    "modifyTime": 1503372171
}, {
    "nodeId": 3178,
    "uin": "2852199351",
    "ivrId": 1228,
    "nodeName": "播音5",
    "nodeType": 1,
    "nodeProperties": {
        "play_list": [],
        "next_node": null,
        "finish_key": "",
        "next_node_is_copy": false,
        "condition": "default"
    },
    "createTime": 1503314659,
    "modifyTime": 1503372170
}, {
    "nodeId": 3179,
    "uin": "2852199351",
    "ivrId": 1228,
    "nodeName": "播音6",
    "nodeType": 1,
    "nodeProperties": {
        "play_list": [],
        "next_node": null,
        "finish_key": "",
        "next_node_is_copy": false,
        "condition": "default"
    },
    "createTime": 1503314659,
    "modifyTime": 1503372170
}, {
    "nodeId": 3180,
    "uin": "2852199351",
    "ivrId": 1228,
    "nodeName": "播音7",
    "nodeType": 1,
    "nodeProperties": {
        "play_list": [],
        "next_node": null,
        "finish_key": "",
        "next_node_is_copy": false,
        "condition": "default"
    },
    "createTime": 1503314659,
    "modifyTime": 1503372170
}, {
    "nodeId": 2638,
    "uin": "2852199351",
    "ivrId": 1228,
    "nodeName": "收号1",
    "nodeType": 6,
    "nodeProperties": {
        "variable": "number",
        "max_length": 10,
        "play_list": [{
            "value": "184",
            "type": "audio"
        }],
        "end_key": "*",
        "timeout_seconds": 5,
        "timeout_times": 1,
        "next_node": 2793,
        "next_node_is_copy": false,
        "condition": "succ",
        "timeout_action": {
            "next_node": 2733,
            "next_node_is_copy": false,
            "condition": "timeout"
        }
    },
    "createTime": 1503132120,
    "modifyTime": 1503372171
}, {
    "nodeId": 2641,
    "uin": "2852199351",
    "ivrId": 1228,
    "nodeName": "时间1",
    "nodeType": 3,
    "nodeProperties": {
        "time_choice": [{
            "time_id": 155,
            "next_node": 2639,
            "next_node_is_copy": false,
            "condition": 155
        }],
        "other_action": {
            "next_node": 3182,
            "next_node_is_copy": false,
            "condition": "other"
        }
    },
    "createTime": 1503132120,
    "modifyTime": 1503372171
}, {
    "nodeId": 2791,
    "uin": "2852199351",
    "ivrId": 1228,
    "nodeName": "时间2",
    "nodeType": 3,
    "nodeProperties": {
        "time_choice": [],
        "other_action": {
            "next_node": 3265,
            "next_node_is_copy": false,
            "condition": "other"
        }
    },
    "createTime": 1503298501,
    "modifyTime": 1503372170
}, {
    "nodeId": 3158,
    "uin": "2852199351",
    "ivrId": 1228,
    "nodeName": "时间3",
    "nodeType": 3,
    "nodeProperties": {
        "time_choice": [],
        "other_action": {
            "next_node": 3181,
            "next_node_is_copy": false,
            "condition": "other"
        }
    },
    "createTime": 1503307680,
    "modifyTime": 1503372171
}, {
    "nodeId": 9850088,
    "uin": "",
    "ivrId": "",
    "nodeName": "转外线1",
    "nodeType": 10,
    "nodeProperties": {
        "phone_num": "+8613022593111",
        "timeout_seconds": 30,
        "timeout_action": {
            "next_node": 8840636,
            "next_node_is_copy": false,
            "condition": {
                "validNode": [
                    5
                ]
            }
        }
    },
    "useFakeId": false
}, {
    "nodeId":8840636,
    "uin":"",
    "ivrId":"",
    "nodeName":"ææ­3",
    "nodeType":5,
    "nodeProperties":{

    },
    "useFakeId":false
}, {
    "nodeId": 3306040,
    "uin": "",
    "ivrId": "",
    "nodeName": "转机器人1",
    "nodeType": 11,
    "nodeProperties": {
        "phone_num": "",
        "timeout_seconds": 30,
        "timeout_action": {
            "next_node": null,
            "next_node_is_copy": false,
            "condition": {
                "validNode": [
                    5
                ]
            }
        }
    },
    "useFakeId": false
}]
