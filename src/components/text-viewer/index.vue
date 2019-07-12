<template>
    <p>
        <span class="title">text-viewer</span>
        <span class="values">
            {{str && str.length ? ':' : ''}} {{str}}
        </span>
    </p>
</template>

<script>
const TextViewer = {
    name: 'TextViewer',
    props: {
        str: String
    }
};
export default TextViewer;
</script>

<style scoped>
.title {
    font-weight: bolder;
}
</style>
