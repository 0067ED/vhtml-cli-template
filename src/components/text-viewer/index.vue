<template>
    <p>
        <span class="title">text-viewer</span>
        <span class="values">
            {{str && str.length ? ':' : ''}} {{str}}
        </span>
    </p>
</template>

<script>
export default {
    name: 'TextViewer',
    props: {
        str: String
    }
};
</script>

<style scoped>
.title {
    font-weight: bolder;
}
</style>
