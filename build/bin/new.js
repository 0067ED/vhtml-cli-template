'use strict';

console.log();
process.on('exit', () => {
    console.log();
});

if (!process.argv[2]) {
    console.error('[组件名]必填.');
    process.exit(1);
}

const path = require('path');
const fileSave = require('file-save');
const uppercamelcase = require('uppercamelcase');
const componentname = process.argv[2];
const chineseName = process.argv[3] || componentname;
const ComponentName = uppercamelcase(componentname);
const PackagePath = path.resolve(__dirname, '../../src/components', componentname);
const Files = [
    {
        filename: 'index.js',
        content: `import ${ComponentName} from './src/${componentname}';
export default ${ComponentName};`
    },
    {
        filename: `src/${componentname}.vue`,
        content: `<style lang="less">
</style>

<template>
<div class="${componentname}">
</div>
</template>

<script>
export default {
    name: '${ComponentName}'
};
</script>`
    },
    {
        filename: 'example.vue',
        content: `<template>
    <div><${componentname}></${componentname}></div>
</template>
<script>
    import ${ComponentName} from './index';
    export default {
        data() {
            return {
            };
        },
        methods: {
        },
        created() {
        },
        components: {
            ${ComponentName}
        }
    };
</script>
            `
    }
];

// 添加到 components.json
const componentsFile = require('../../src/components/components.json');
if (componentsFile[componentname]) {
    console.error(`${componentname} 已存在.`);
    process.exit(1);
}

componentsFile[componentname] = `http://localhost:8963/examples/pages/index/${componentname}`;

fileSave(path.join(__dirname, '../../src/components/components.json'))
    .write(JSON.stringify(componentsFile, null, 4), 'utf8')
    .end('\n');

Files.push({
    filename: '../../../src/pages/examples/pages/route.config.js',
    content: `let route = [];
/*eslint-disable */

let components = ${JSON.stringify(componentsFile, null, 4)};

/*eslint-enable */

for (let component in components) {
    if (!components.hasOwnProperty(component)) {
        continue;
    }
    route.push({
        path: '/' + component,
        name: '',
        component: require('../../../components/' + component + '/example')
    });
}

export default route;
`
});

// 创建 package
Files.forEach(file => {
    fileSave(path.join(PackagePath, file.filename))
    .write(file.content, 'utf8')
    .end('\n');
});

// 添加到 nav.config.json
// const navConfigFile = require('../../src/pages/examples/nav.config.json');
//
// Object.keys(navConfigFile).forEach(lang => {
//     let groups = navConfigFile[lang][1].groups;
//     groups[groups.length - 1].list.push({
//         path: `/${componentname}`,
//         title: lang === 'zh-CN' && componentname !== chineseName
//             ? `${ComponentName} ${chineseName}`
//             : ComponentName
//     });
// });
//
// fileSave(path.join(__dirname, '../../examples/nav.config.json'))
//     .write(JSON.stringify(navConfigFile, null, '  '), 'utf8')
//     .end('\n');
// require('./build-entry');
console.log('DONE!');
