<template>
<div>
    <div class="nav-bar">
        <router-link to="/"><< 列表</router-link>
        <div class="right-holder">
            <!-- <v-button @click="startBuild">在线构建</v-button> -->
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
</div>
</template>

<script>
const axios = require('axios');
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
        }
    },
    data() {
        return {
            currentComponent: window.components[0].name
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
        startBuild() {
            let client = axios.create({});
            client.defaults.headers['content-type'] = 'application/json';
            client.defaults.headers['x-dqapi-authentication'] = '31KIIPHNG3D76JBBIGSE529MH8SRQND0';
            client.defaults.headers['x-dqapi-username'] = 'shidichen';

            client({
                url: 'http://api.dq.oa.com/qci/rest-api/pipeline/10585/start',
                method: 'POST',
                // data: {
                    // trigger_base: 'branch',
                    // cur_branch: 'master',
                    // cur_env_params: {
                    //     COMPONENT_NAME: this.currentComponent
                    // }
                // },
                headers: {
                    'content-type': 'application/json',
                    'x-dqapi-authentication': '31KIIPHNG3D76JBBIGSE529MH8SRQND0',
                    'x-dqapi-username': 'shidichen'
                }
            }).then(r => {
                window.open('http://qci.oa.com/#/pipeline/10585/totalresult/current');
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
</style>

