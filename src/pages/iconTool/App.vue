<template>
    <div class="page-dash-icon">
        <div class="content-title">
            图标仪表盘
        </div>
        <p class="hint-tip">注：文件路径均相对于src目录，svg图标别忘了使用addSprites</p>
        <p class="hint-tip">点击图标名称即可自动复制&lt;v-icon name="xxx"&gt; &lt;/v-icon&gt;"到剪切板</p>
        <v-tabs v-model="selectedType" indent="45">
            <v-tab>svg图标</v-tab>
            <v-tab>png图标</v-tab>
        </v-tabs>
        <div class="dash-icon-grid-wrap" v-show="selectedType==0">
            <div v-for="(icons, index) in pageIcons">
                <p class="desc-title">{{index}}</p>
                <ul>
                    <li v-for="iconx in icons">
                        <v-icon :name="iconx.name"></v-icon>
                        <v-copy kind="text" :value="iconString(iconx)">
                            <div @click="clickedName(iconx.name)" class="name-desc">{{iconx.name}}</div>
                        </v-copy>
                        <div class="desc-content-wrap">
                            <p class="url-desc">{{iconx.url}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="dash-icon-grid-wrap" v-show="selectedType==1">
            <div v-for="(icons, index) in taskIcons">
                <p class="desc-title">{{index}}</p>
                <ul>
                    <li class="img-li" v-for="iconx in icons">
                        <img :src="pngSprites(iconx.url)" alt="" class="image-dest">
                        <p class="name-desc">{{iconx.name}}</p>
                        <p class="url-desc">{{iconx.url}}</p>
                    </li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
    import {Icon, Tabs, Copy} from 'vhtml-ui';
    const taskSprites = require.context('../../', true, /[^\.]+\.svg$/);
    const pngSprites = require.context('../../', true, /[^\.]+\.png/);
    Icon.addSprites(taskSprites);

    export default {
        name: 'dashIcon',
        data() {
            return {
                pageIcons: {},
                taskIcons: {},
                iconUrls: [],
                pngSprites: pngSprites,
                iconNames: [],
                pathSet: {},
                selectedType: 0
            };
        },
        mounted() {
//            console.log('toload');
            this.importSVG(taskSprites);
            this.importPng(pngSprites);

        },
        computed: {

        },
        methods: {
            iconString(icon) {
                return '<v-icon name="' + icon.name + '"></v-icon>';
            },
            importSVG(r) {
                r.keys().forEach(
                    key => {
                        key = key.substring(2);
                        let key_arr = key.split('/');
                        let tar = key_arr[key_arr.length - 1];
                        let index = key_arr[0] + '/' + key_arr[1];
                        if (!this.pageIcons[index]) {
                            this.$set(this.pageIcons, index, []);
                        }
                        this.pageIcons[index].push({
                            url: './' + key,
                            name: tar.split('.')[0]
                        });
                    }
                );
            },
            importPng(r) {
                r.keys().forEach(
                    key => {
                        key = key.substring(2);
                        let key_arr = key.split('/');
                        let tar = key_arr[key_arr.length - 1];
//                        let index = key_arr[0];
                        let index = key_arr[0] + '/' + key_arr[1];
                        if (!this.taskIcons[index]) {
                            this.$set(this.taskIcons, index, []);
                        }
                        this.taskIcons[index].push({
                            url: './' + key,
                            name: tar.split('.')[0]
                        });
                    }
                );
            },
            clickedName(name) {
                this.$message.success('已复制<v-icon name=""' + name + '"></v-icon>到剪切板');
            }
//            copyIcon(icon) {
//                console.log(icon);
//                let text = '<v-icon name="' + icon.name + '"></v-icon>';
//                console.log(text);
//                let data = window.ClipboardEvent.clipboardData;
//                console.log(data);
//                setTimeout(function () {
//                    window.ClipboardEvent.clipboardData && window.ClipboardEvent.clipboardData.setData('text/plain', text);
//                },100)
//            }
        },
        created() {
            // console.log(this.$ajax);
        },
        components: {
            // DataFilterDemo
            VIcon: Icon,
            VTabs: Tabs,
            VCopy: Copy
        }
    };
</script>

<style>
    .page-dash-icon {
        .hint-tip{
            margin-top: -10px;
            padding-bottom: 20px;
            color:#ff4222;
        }
        .dash-icon-grid-wrap {
            margin-top:20px;
            .desc-title {
                font-size: 22px;
            }
            li{
                display: inline-block;
                background-color: #f4f6f9;
                margin: 10px;
                padding: 10px;
                width: 150px;
                border: 1px solid #dadee7;
                text-align: center;
                height: 100px;
                svg {
                    width: 20px;
                    height: 20px;
                    color:#a8abb3;
                }
                .image-dest{
                    max-width:200px;
                    max-height: 150px;
                }
            }
            .img-li{
                width: 200px;
                height: 200px;
            }
            .name-desc {
                font-size: 18px;
                color: #1e2330;
                cursor: pointer;
            }
            .desc-content-wrap{
                overflow:auto;
                height:50px;
            }
            .url-desc {
                width: 150px;
                color: #0056c7;
                word-wrap:break-word;
            }
        }
    }
</style>
