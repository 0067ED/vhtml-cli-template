<template>
    <div class="components-guide">
        <h2>业务组件指南</h2>
        <h3>-------- 建议新同学在开发之前仔细阅读，点击可直接进入对应API。</h3>
        <v-table :data="data" :tree-table="true" @rowClick="rowClick" row-clazz="components-guide-table">
            <v-table-column v-for="column in columns" :key="column.label"
                :column-key="column.columnKey"
                :label="column.label"
                :align="column.align"
                :width="column.width"
                :render="column.render">
            </v-table-column>
        </v-table>
        <br>
        <h2>工具类utils指南</h2>
        <h3>-------- 建议新同学在开发之前仔细阅读相关工具类方法。</h3>
        <v-table :data="utilsData">
            <v-table-column v-for="column in utilsColumns" :key="column.label"
                :column-key="column.columnKey"
                :label="column.label"
                :align="column.align"
                :width="column.width"
                :render="column.render">
            </v-table-column>
        </v-table>
    </div>
</template>

<script>
import {data, columns, utilsData, utilsColumns} from './config.js';
let classifyList = ['select', 'table', 'chart', 'input', 'actions', 'other'];
const BASE_URL = '/examples/pages/index/';

export default {
    name: 'components-guide',
    data() {
        return {
            data: data,
            columns: columns,
            utilsData: utilsData,
            utilsColumns: utilsColumns
        };
    },
    methods: {
        rowClick(row, index) {
            if (row.switchClass) {
                row.switchClass = '';
            }
            else {
                row.switchClass = 'is-switch';
            }
            if (classifyList.indexOf(row.name) === -1 && row.name !== 'common-select(推荐)') {
                window.location = BASE_URL + row.name;
            }
            else if (row.name === 'common-select(推荐)') {
                window.location = BASE_URL + row.name.substr(0, 13);
            }
        }
    },
    computed: {
        closeClass() {
            return 'col-comname-close';
        }
    }
};
</script>

<style lang="less">
    .components-guide {
        padding: 30px;
        h2 {
            font-size: 30px;
            text-align: center;
        }
        h3 {
            font-size: 18px;
            line-height: 30px;
            text-align: right;
            margin-bottom: 30px;
        }
        &-table {
            cursor: pointer;
        }
        .col-comname {
            .col-comname-close {
                display: inline-block;
                width: 20px;
                height: 20px;
                vertical-align: -4px;
                cursor: pointer;
                line-height: 35px;
                margin: 0 5px;
                background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAoCAMAAADJ7yrpAAAAYFBMVEVmaGz///9maGxmaGxmaGxmaGxmaGxmaGxmaGxmaGxmaGxmaGxmaGxmaGxmaGxmaGxmaGxmaGxmaGxmaGxmaGxmaGxmaGxmaGxmaGxmaGxmaGxmaGxmaGxmaGxmaGxmaGytb7S4AAAAH3RSTlMAAAEGBxkbHB04Oz9BZGlwc5iam53Fxsrl5ur4+vv8ZH3yaAAAAGRJREFUKM/V0EcOgDAMRNGh915Cn/vfkh0oibcg8PJJlq0PRxh8FnuSJDsNfUWSytMQ0UIuMXREth85TERVw0a4Jv6l0ovYeFekGzkEAnJKBORaCLiVNs6pvT6G9qHWF156OsgJnuQHuRmHPsIAAAAASUVORK5CYII=);
                background-position: 0 -20px;
            }
            .is-switch {
                background-position: 0 0;
            }
        }
    }
</style>

