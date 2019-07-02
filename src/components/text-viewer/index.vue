<template>
    <h3>text-viewer{{str && str.length ? ':' : ''}} {{str}}</h3>
</template>

<script>
export default {
    name: 'Text',
    props: {
        str: String
    }
};
</script>
