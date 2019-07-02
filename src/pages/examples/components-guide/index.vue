<template>
    <div class="components-guide">
        <h2>本地组件列表</h2>
        <v-table :data="list" :tree-table="true" row-clazz="components-guide-table">
            <v-table-column v-for="column in columns" :key="column.label"
                :column-key="column.key"
                :label="column.label"
                :render="column.render">
            </v-table-column>
        </v-table>
    </div>
</template>

<script>
export default {
    name: 'components-guide',
    data() {
        return {
            columns: [
                {label: '组件名', key: 'name'},
                {label: '版本', key: 'version'},
                {label: '描述', key: 'description'},
                {
                    label: '示例页',
                    key: 'name',
                    render(h, {row}) {
                        if (!row.hasExample) {
                            return h('span', '无');
                        }
                        return h('router-link', {
                            props: {
                                to: `/examples/${row.name}/example`
                            }
                        }, row.name);
                    }
                }
            ]
        };
    },
    methods: {
    },
    computed: {
        // 从 window.components 中读取组件列表
        list() {
            return window.components;
        }
    }
};
</script>

<style lang="less">
    .components-guide {
        padding: 30px;
        h2 {
            font-size: 30px;
        }
    }
</style>
