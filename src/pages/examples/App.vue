<template>
    <div class="component-examples">
        <router-view class="content-wrap"></router-view>
    </div>
</template>

<script>
const GUIDE_URL = '/examples/index';
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
    body {
        margin: 0;
    }
    .component-examples {
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

