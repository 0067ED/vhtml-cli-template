<template>
    <div class="components-description">
        <template v-if="propsData.length > 0">
            <h1 class="demo-section-title">{{ `${componentName} props`}}</h1>
            <v-table :data="propsData">
                <v-table-column v-for="column in propsCols" :key="column.label"
                    :column-key="column.columnKey"
                    :label="column.label"
                    :width="column.width"
                ></v-table-column>
            </v-table>
        </template>
        <template v-if="slotsData.length > 0">
            <h1 class="demo-section-title">{{ `${componentName} slots`}}</h1>
            <v-table :data="slotsData">
                <v-table-column v-for="column in slotsCols" :key="column.label"
                    :column-key="column.columnKey"
                    :label="column.label"
                    :width="column.width"
                ></v-table-column>
            </v-table>
        </template>
        <template v-if="eventsData.length > 0">
            <h1 class="demo-section-title">{{ `${componentName} events`}}</h1>
            <v-table :data="eventsData">
                <v-table-column v-for="column in eventsCols" :key="column.label"
                    :column-key="column.columnKey"
                    :label="column.label"
                    :width="column.width"
                ></v-table-column>
            </v-table>
        </template>
        <template v-if="methodsData.length > 0">
            <h1 class="demo-section-title">{{ `${componentName} methods`}}</h1>
            <v-table :data="methodsData">
                <v-table-column v-for="column in methodsCols" :key="column.label"
                    :column-key="column.columnKey"
                    :label="column.label"
                    :width="column.width"
                ></v-table-column>
            </v-table>
        </template>
    </div>
</template>

<script>
export default {
    name: 'ComponentDescription',

    props: {
        componentName: {
            type: String,
            required: true
        },
        propsCols: {
            type: Array,
            default: function () {
                return [];
            }
        },
        propsData: {
            type: Array,
            default: function () {
                return [];
            }
        },
        slotsCols: {
            type: Array,
            default: function () {
                return [];
            }
        },
        slotsData: {
            type: Array,
            default: function () {
                return [];
            }
        },
        eventsCols: {
            type: Array,
            default: function () {
                return [];
            }
        },
        eventsData: {
            type: Array,
            default: function () {
                return [];
            }
        },
        methodsCols: {
            type: Array,
            default: function () {
                return [];
            }
        },
        methodsData: {
            type: Array,
            default: function () {
                return [];
            }
        }
    }
};
</script>

<style lang="less">
.components-description {
    margin-top: 50px;

    .demo-section-title {
        font-size: 28px;
        padding-top: 30px;
    }
}
</style>

