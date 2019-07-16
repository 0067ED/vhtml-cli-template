<template>
<div>
    <h2>text-view 的示例页面</h2>
    <text-viewer str="Hello, vhtml"></text-viewer>
</div>
</template>

<script>
import TextViewer from '../index';
export default {
    name: 'text-viewer-example',
    components: {TextViewer}
};
</script>

