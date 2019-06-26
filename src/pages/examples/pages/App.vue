<template>
    <div class="component-examples">
        <div class="back-guide"
            v-if="!isShow"
            @click="handleBack">
            <v-icon name="back"></v-icon>
            返回指南</div>
        <components-guide v-if="isShow"></components-guide>
        <router-view class="content-wrap"></router-view>
    </div>
</template>

<script>
import componentsGuide from './components-guide/index.vue';
const GUIDE_URL = '/examples/pages/index';
export default {
    name: 'app',
    data() {
        return {
            isShow: true
        };
    },
    methods: {
        handleBack() {
            window.location = GUIDE_URL;
        }
    },
    created() {
    },
    components: {
        // DataFilterDemo
        componentsGuide
    },
    watch: {
        $route: {
            handler(val, oldVal) {
                if (val.path !== '/examples' && val.path !== '/') {
                    this.isShow = false;
                }
                else {
                    this.isShow = true;
                }
            },
            deep: true,
            immediate: true
        }
    }
};
</script>

<style lang='less'>
    .component-examples {
        padding-top: 50px;
        .back-guide {
            z-index: 10;
            position: fixed;
            top: 80px;
            left: 250px;
            text-decoration: none;
            color: #a8abb3;
            font-size: 18px;
            cursor: pointer;
            &:hover {
                color: #1e2330;
            }
            .v-icon {
                height: 16px;
                width: 16px;
                vertical-align: -3px;
            }
        }
    }
</style>

