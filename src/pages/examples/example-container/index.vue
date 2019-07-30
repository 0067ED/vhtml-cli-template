<template>
<div>
    <div class="nav-bar">
        <router-link to="/"><< 列表</router-link>
        <div class="right-holder">
            <v-button class="margin-right-md" @click="isShowLocalDebug=true">本地调试</v-button>
            <v-select
                v-model="currentComponent"
                :options="options"
                style="background-color: #fff;"
                @change="openExample"
            ></v-select>
        </div>
    </div>
    <div class="example-router">
        <router-view></router-view>
    </div>
    <v-dialog
        v-model="isShowLocalDebug"
        title="本地调试"
        :mask-closable="true"
        @show="debugScriptUrl=''; commandOutput='';"
        >
        <div class="help-dialog-content">
            <p>本地调试用于在开发阶段在不发布的情况下，直接在页面中调试组件，如可在 rhino.oa.com 中直接引用还在开发阶段中的模块。</p>
            <v-button kind="primary" :disabled="isLoading" @click="startBuild">{{isLoading ? '构建中……' : '构建组件'}}</v-button>
            <div class="build-result" v-if="!isLoading && commandOutput">
                <textarea class="command-like-output" v-model="commandOutput"></textarea>
            </div>
            <div class="usage-helper" v-if="debugScriptUrl">
                <p>然后请在需要调试的页面终端中，执行如下代码：</p>
                <textarea class="command-like-output" v-model='debugScript'></textarea>
            </div>
        </div>
    </v-dialog>
</div>
</template>

<script>
export default {
    name: 'ExampleContainer',
    computed: {
        options() {
            let opts = [];
            window.components.map(cmpt => {
                opts.push({
                    text: cmpt.name,
                    value: cmpt.name
                });
            });
            return opts;
        },
        debugScript() {
            let s = `(()=>{
    let market = {};
    let lc = localStorage.__market
    if (lc && lc.length > 2) {
        market = JSON.parse(lc);
    }
    market['${this.currentComponent}']='${this.debugScriptUrl}';
    localStorage.setItem('__market', JSON.stringify(market));
})()`;
            return s;
        }
    },
    data() {
        return {
            currentComponent: window.components[0].name,
            isLoading: false,
            isShowLocalDebug: false,
            // 执行 build 后的输出内容
            commandOutput: '',
            // 返回调试脚本的 url 地址
            debugScriptUrl: ''
        };
    },
    created() {
        // 检查路径，确定自定义组件下拉框中的默认选中
        let url = window.location.href;
        window.components.map(cmpt => {
            if (cmpt && cmpt.name && url.search(cmpt.name) > 0) {
                this.currentComponent = cmpt.name;
            }
        });
    },
    methods: {
        openExample() {
            this.$router.push({
                path: '/examples/' + this.currentComponent
            });
        },

        // 执行组件构建
        startBuild() {
            if (this.isLoading) {
                return;
            }
            this.debugScriptUrl = '';
            this.commandOutput = '';
            this.isLoading = true;
            this.$ajax.post('/build', {
                component: this.currentComponent
            }).then(res => {
                if (res && res.data && res.data.output) {
                    this.commandOutput = res.data.output;
                    if (res.data.isSuccess) {
                        this.debugScriptUrl = window.location.origin + res.data.path;
                    }
                }
                this.isLoading = false;
            }).catch(e => {
                this.isLoading = false;
            });
        }
    }
};
</script>

<style lang="less">
.nav-bar {
    display: flex;
    margin: 0;
    padding: 15px 30px;
    background-color: #0067ed;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    color: #fff;

    a {
        color: #fff;
        font-size: 18px;
        text-decoration: none;
    }

    .right-holder {
        display: flex;
    }
}
.example-router {
    margin: 10px;
}

// 去除 vhtml dialog 中的 header body 的 height: 100%
.v-dialog__content {
    .v-dialog__header, .v-dialog__body {
        height: initial !important;
    }
}

.help-dialog-content {
    margin: 10px;
}
.margin-right-md {
    margin-right: 12px;
}

.build-result {
    margin: 10px 0px;
}
.command-like-output {
    background-color: black;
    width: 100%;
    height: 200px;
    color: white;
}
</style>

