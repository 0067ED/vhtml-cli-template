// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import vhtml from 'vhtml-ui';
import Vue from 'vue';
import VueRouter from 'vue-router';
import configRouter from './route.config';
import App from './App.vue';
import './ajax';

vhtml.install(Vue);
Vue.use(vhtml);
Vue.use(VueRouter);
Vue.config.productionTip = false;

let routeConfig = {
    routes: configRouter,
    mode: 'history'
};
const router = new VueRouter(routeConfig);

/* eslint-disable no-new */
new Vue({
    render(h) {
        return h(App);
    },
    router
}).$mount('#app');
