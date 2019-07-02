let routes = [];

// app.vue
routes.push({
    path: '/',
    component: require('./components-guide/index.vue')
});

window.components.map(component => {
    if (component.hasExample) {
        routes.push({
            path: `/examples/${component.name}/example`,
            component: require(`../../components/${component.name}/example/index.vue`)
        });
    }
});

export default routes;
