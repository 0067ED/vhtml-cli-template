<template>
<div>
    <div class="nav-bar">
        <router-link to="/"><< 列表</router-link>
        <div class="right-holder">
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

