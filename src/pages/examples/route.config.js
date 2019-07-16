let routes = [];
let children = [];

window.components.map(component => {
    if (component.hasExample) {
        children.push({
            path: `${component.name}`,
            component: require(`../../components/${component.name}/example/index.vue`)
        });
    }
});

// app.vue
routes.push({
    path: '/',
    component: require('./components-guide/index.vue')
}, {
    path: '/examples',
    component: require('./example-container/index.vue'),
    children
});

export default routes;
