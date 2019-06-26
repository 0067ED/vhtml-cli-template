<template>
    <div class="mapbox-wrapper">
        <div class="mod source">
            <textarea name="name" v-model="source" rows="8" cols="80"></textarea>
        </div>
        <div class="mod key">
            <v-select-list  multiple v-model="key" :options="keyOpt" ></v-select-list>

        </div>
        <div class="mod format">
            <textarea name="name" v-model="format" rows="8" cols="80"></textarea>
            {{key}}
        </div>
        <div class="mod result">
            <textarea name="name" v-model="result" rows="8" cols="80"></textarea>
        </div>
    </div>
</template>

<script>

export default {
    name: 'app',
    data() {
        return {
            format: `
                {
                    "value": "statusTime",
                    "label": "状态时长",
                    "format": "time",
                    "default": 1,
                    "cat": "status"

                }
            `,
            source: `{
                "nameAccount": "2852199000",
                "kfuin": "2852199000",
                "name": "Guest",
                "face": "2",
                "mobile": "3",
                "loginUin": "2852199000",
                "loginFace": "4",
                "loginName": "5",
                "isAdmin": 1
            }`,
            key: [],
            result: ''
        };
    },
    watch: {
        source() {}
    },
    computed: {
        keyOpt() {
            var r = [];
            var p = JSON.parse(this.source);
            for (var i in p) {
                if (!p.hasOwnProperty(i)) {
                    continue;
                }
                r.push({
                    text: i,
                    value: i
                });
            }
            return r;
        }
    },
    methods: {
    },
    created() {
    },
    components: {
        // DataFilterDemo
    }
};
</script>

<style lang="less">
.mapbox-wrapper {
    display: flex;
    .mod {
        width: 300px;
        border: 1px solid #000;
        justify-content: space-around;
    }
    textarea {
        width: 100%;
        height: 500px;
        border: 0;
    }
}

</style>
