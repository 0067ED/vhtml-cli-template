export const data = [{
    name: 'select',
    apply: '展开见详情',
    desc: '包含了各种场景的下拉选择，有pop和dialog不同形式的单选，多选，地区选择，电话选择，人工选择等等等等',
    type: 1,
    children: [{
        name: 'common-select(推荐)',
        apply: '应用场景',
        desc: '集单选，多选，层级，异步拉取，翻页，搜索等功能与一身'
    }, {
        name: 'scroll-select',
        apply: '短信模版的创建页面',
        desc: '这是一个混合了radio和select-list的选择组件，应用于短信模版的创建页面'
    }, {
        name: 'phone-select',
        apply: '应用场景',
        desc: '电话选择'
    }, {
        name: 'phone-group-select',
        apply: '应用场景',
        desc: '电话选择'
    }, {
        name: 'location-select',
        apply: '应用场景',
        desc: '地区选择'
    }, {
        name: 'regions-select',
        apply: '应用场景',
        desc: '地区选择'
    }, {
        name: 'domain-select',
        apply: '应用场景',
        desc: '域名选择'
    }, {
        name: 'audio-select',
        apply: '应用场景',
        desc: '语音选择'
    }, {
        name: 'voice-select-dialog',
        apply: '应用场景',
        desc: '语音导航选择'
    }, {
        name: 'staff-select',
        apply: '应用场景',
        desc: '员工选择'
    }, {
        name: 'staff-group-select',
        apply: '应用场景',
        desc: '员工选择'
    }, {
        name: 'staff-picker-select',
        apply: '应用场景',
        desc: '员工选择'
    }, {
        name: 'staff-select-dialog',
        apply: '应用场景',
        desc: '员工选择'
    }, {
        name: 'staff-single-picker',
        apply: '应用场景',
        desc: '员工选择'
    }, {
        name: 'pop-select',
        apply: '应用场景',
        desc: '弹出多条件的单选'
    }, {
        name: 'score-select',
        apply: '应用场景',
        desc: '满意度打分的下拉选择，可级联'
    }, {
        name: 'call-duration-select',
        apply: '应用场景',
        desc: '设置通话时长的下拉选择'
    }, {
        name: 'call-duration-infinite-select',
        apply: '应用场景',
        desc: '设置通话时长中带有“不限”功能的下拉选择'
    }, {
        name: 'single-select',
        apply: '应用于自定义人群包的配置单选项',
        desc: '单选下拉框'
    }, {
        name: 'multiple-select',
        apply: '应用于自定义人群包的配置多选项',
        desc: '多选下拉框'
    }, {
        name: 'pop-chosen-select-list',
        apply: '应用场景',
        desc: '单选并可弹出单选'
    }, {
        name: 'group-select',
        apply: '应用场景',
        desc: '单选并可弹出多选'
    }, {
        name: 'box-select',
        apply: '应用场景',
        desc: '块级元素选择与新增'
    }, {
        name: 'cascader-select',
        apply: '应用场景',
        desc: '级联下拉选择'
    }, {
        name: 'select-tigger',
        apply: '应用场景',
        desc: '简单描述'
    }, {
        name: 'panel-select',
        apply: '应用场景',
        desc: '自带全选的多选下拉框，适用于之前的需求场景，现在推荐使用common-selecte'
    }, {
        name: 'msg-panel-select',
        apply: '应用场景',
        desc: '适用于之前的需求场景，现在推荐使用common-selecte'
    }, {
        name: 'keywords-select',
        apply: '应用场景',
        desc: '适用于之前的需求场景，现在推荐使用common-selecte'
    }, {
        name: 'msg-tmp-select',
        apply: '应用场景',
        desc: '适用于之前的需求场景，现在推荐使用common-selecte'
    }, {
        name: 'pop-panel-select',
        apply: '应用场景',
        desc: '适用于之前的需求场景，现在推荐使用common-selecte'
    }, {
        name: 'gdt-group-select',
        apply: '应用场景',
        desc: '适用于之前的需求场景，现在推荐使用common-selecte'
    }, {
        name: 'tag-select',
        apply: '应用场景',
        desc: '适用于之前的需求场景，现在推荐使用common-selecte'
    }, {
        name: 'reception-select',
        apply: '公众号选择',
        desc: '适用于之前的需求场景，现在推荐使用common-selecte'
    }, {
        name: 'single-panel-select',
        apply: '应用场景',
        desc: '适用于之前的需求场景，现在推荐使用common-selecte'
    }, {
        name: 'ts-tag',
        apply: '粉丝标签选择',
        desc: '适用于之前的需求场景，现在推荐使用common-selecte'
    }]
}, {
    name: 'table',
    apply: '展开见详情',
    desc: '根据业务需求，给我们V-HTML的table基础组件又做了一层封装，建议考量后，选择正确的table业务组件',
    type: 1,
    children: [{
        name: 'grid',
        apply: '应用场景',
        desc: '简单描述'
    }, {
        name: 'report-grid',
        apply: '应用场景',
        desc: ` 代码: <report-grid :options="options" :params="params"></report-grid>;
        参数: options为配置参数(完成配置后不需要改变), 可用页面下方的options编辑器生成params内存放条件参数(动态变化), 如域名、时间、设备等, 可在页面内自行配置`
    }, {
        name: 'column-filter',
        apply: '应用场景',
        desc: '不要放在grid里面，用position: absolute定位在table右上角。'
    }, {
        name: 'new-table-demo',
        apply: '应用场景',
        desc: '简单描述'
    }, {
        name: 'report',
        apply: '应用场景',
        desc: `基于grid的report组件`
    }]
}, {
    name: 'chart',
    apply: '展开见详情',
    desc: '关于图形的业务组件，目前场景不是太多，有相同的需求，就来取吧',
    type: 1,
    children: [{
        name: 'chart-tab',
        apply: '应用场景',
        desc: '简单描述'
    }, {
        name: 'report-chart',
        apply: '应用场景',
        desc: ` 代码: <report-chart :options="options" :params="params"></report-chart>;
                参数: options为配置参数(完成配置后不需要改变), 可用页面下方的options编辑器生成params内存放条件参数(动态变化), 如域名、时间、设备等, 可在页面内自行配置`
    }, {
        name: 'report-flow',
        apply: '应用场景',
        desc: '简单描述'
    }, {
        name: 'report-flow-async',
        apply: '应用场景',
        desc: '简单描述'
    }, {
        name: 'scatter',
        apply: '应用场景',
        desc: '简单描述'
    }, {
        name: 'funnel',
        apply: '应用场景',
        desc: '漏斗图形'
    }]
}, {
    name: 'input',
    apply: '展开见详情',
    desc: '对于V-HTML的input基础组件做了一层封装，业务需求有提交、特殊验证、特殊处理、快速添加等',
    type: 1,
    children: [{
        name: 'comfirm-input',
        apply: '应用场景',
        desc: '单个确认提交的input'
    }, {
        name: 'validate-input',
        apply: '应用场景',
        desc: '特殊验证的input'
    }, {
        name: 'format-input',
        apply: '应用场景',
        desc: '可对值做特殊处理的input'
    }, {
        name: 'pop-input',
        apply: '应用场景',
        desc: '快速添加数据，以弹框形式展开'
    }, {
        name: 'editor',
        apply: '通用编辑组件',
        desc: '快速构造编辑页面'
    }]
}, {
    name: 'actions',
    apply: '展开见详情',
    desc: '有一些常规操作的业务组件,如配合表格单行操作的，页面跳转和数据导出等',
    type: 1,
    children: [{
        name: 'action',
        apply: '应用场景',
        desc: '可与表格的render函数配合使用'
    }, {
        name: 'back',
        apply: '应用场景',
        desc: '可进行路由跳转，页面返回等操作，类似于a标签'
    }, {
        name: 'export',
        apply: '应用场景',
        desc: '用于数据的导出'
    }]
}, {
    name: 'other',
    apply: '展开见详情',
    desc: '有对于页面布局有帮助的cell组件，目前不是太多，希望多多补充',
    type: 1,
    children: [{
        name: 'cell',
        apply: '应用场景',
        desc: '对于左icon右文字的各种布局，有强大的通用性，能大大简化个人操作，提高页面开发效率，具体API，请点击查看'
    }, {
        name: 'audio-player',
        apply: '应用场景',
        desc: '音频播放器'
    }, {
        name: 'customer-info',
        apply: '应用场景',
        desc: '简单描述'
    }, {
        name: 'qidian-wpa',
        apply: '应用场景',
        desc: '简单描述'
    }, {
        name: 'msg-bubble',
        apply: '应用场景',
        desc: '属性value用于设置短信内容属性hasBlock用于设置短信气泡外边有没有框，默认false对组件设置css宽度时候，width作用于气泡大小，包括左下角小尾巴'
    }]
}];

export const columns = [{
    label: '分类/名称',
    columnKey: 'name',
    width: 200,
    align: 'left',
    render: (h, data) => {
        let name = data.row.name;
        if (data.row.type === 1) {
            return <div class={'col-comname'}>
                <span class={'col-comname-close ' + data.row.switchClass} ref="switch"></span>
                {name}
            </div>;
        }
        return <div class="col-name">
            {name}
        </div>;
    }
}, {
    label: '应用场景',
    columnKey: 'apply',
    width: 400,
    align: 'left'
}, {
    label: '简单描述',
    columnKey: 'desc',
    width: 500,
    align: 'left'
}];

export const utilsData = [
    {
        name: 'ajax',
        apply: '接口请求',
        desc: '对项目接口请求的封装，并挂在在全局的this',
        type: 1
    },
    {
        name: 'browser',
        apply: '对浏览器的判断',
        desc: '对所在浏览的判断，pc端以及移动的设备判断',
        type: 2
    },
    {
        name: 'bus',
        apply: '全局EventBus',
        desc: 'vue的通信eventBus',
        type: 3
    },
    // {
    //     name: 'chartHelper',
    //     apply: '展开见详情',
    //     desc: '简单描述',
    //     type: 4
    // },
    {
        name: 'cookie',
        apply: '对cookie的操作',
        desc: '对cookie进行的增删改查操作',
        type: 5
    },
    {
        name: 'dateTool',
        apply: '对日期的工具类',
        desc: '格式化日期代码',
        type: 6
    },
    {
        name: 'debounce',
        apply: '延时操作',
        desc: '通过回掉延时操作方法',
        type: 7
    },
    {
        name: 'dom',
        apply: '页面dom的操作',
        desc: '拥有许多方法获取滚动区域，元素样式等一些dom的操作',
        type: 8
    },
    {
        name: 'escapeRegExp',
        apply: '判断一些表单数据的提交是否包含xss攻击',
        desc: '替换一些表单数据符合xss攻击',
        type: 9
    },
    {
        name: 'extend',
        apply: '对一些js方法扩展',
        desc: '对一些js方法扩展',
        type: 10
    },
    {
        name: 'filter',
        apply: '项目中filter的方法',
        desc: '项目中filter的方法，防止xss攻击的',
        type: 11
    },
    {
        name: 'formStore',
        apply: '存储的api分装',
        desc: '提供获取、修改以及清除的api接口',
        type: 12
    },
    {
        name: 'guardEvent',
        apply: '防止路由重定向',
        desc: '根据target或者浏览器默认行为防止浏览器重定向',
        type: 13
    },
    {
        name: 'htmlEscape',
        apply: '对项目中后台返回的html格式的判断',
        desc: '对项目中后台返回的html格式的判断，防止xss攻击',
        type: 14
    },
    {
        name: 'jsonp',
        apply: 'jsonp的封装',
        desc: 'jsonp的封装',
        type: 15
    },
    {
        name: 'loadResource',
        apply: '项目资源加载的封装',
        desc: '对项目css，js家在的封装达到兼容性效果',
        type: 16
    },
    {
        name: 'md5',
        apply: 'md5加密方法',
        desc: 'md5加密方法',
        type: 17
    },
    {
        name: 'numberTool',
        apply: '数字显示一些方法',
        desc: '对table数据显示的一些方法',
        type: 18
    },
    {
        name: 'raf',
        apply: '对css动画新属性的封装',
        desc: '对css动画新属性的封装，添加ms,moz,webkit,o',
        type: 19
    },
    {
        name: 'report',
        apply: '对上报的封装',
        desc: '传入url进行，对图片添加时间戳进行上报',
        type: 20
    },
    {
        name: 'route',
        apply: '对路由的封装',
        desc: '兼容以前老路由',
        type: 21
    },
    {
        name: 'route-sync',
        apply: '路由同步',
        desc: '路由工具类',
        type: 22
    },
    {
        name: 'speedMonitior',
        apply: '对页面速度的监控',
        desc: '多页面响应，跳转，接口的速度的监控',
        type: 23
    },
    {
        name: 'store',
        apply: '存储的封装',
        desc: '存储的简易封装',
        type: 24
    },
    {
        name: 'uuid',
        apply: '生成36位唯一数字',
        desc: '生成36位唯一数字',
        type: 25
    },
    {
        name: 'validate',
        apply: '一些验证规则配合form一起使用',
        desc: '对url，email，ip的一些验证规则',
        type: 26
    },
    {
        name: 'websocket',
        apply: '对websocket工具类的封装方法',
        desc: '对websocket工具类的封装方法，兼容浏览器',
        type: 27
    },
    {
        name: 'windowOpen',
        apply: '对跳转的封装',
        desc: '对跳转页面的的一些封装',
        type: 28
    },
    {
        name: 'stationInfo',
        apply: '获取当前页面所在子站的信息',
        desc: '获取当前页面在子站的一些信息,如 营销: yx, 客服:fw, 分析: ea, 电话: cc',
        type: 28
    }
];

export const utilsColumns = [{
    label: '分类/名称',
    columnKey: 'name',
    width: 200,
    align: 'left'
}, {
    label: '应用场景',
    columnKey: 'apply',
    width: 400,
    align: 'left'
}, {
    label: '简单描述',
    columnKey: 'desc',
    width: 500,
    align: 'left'
}];
