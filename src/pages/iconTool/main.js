// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import vhtml from 'vhtml-ui';
import VueRouter from 'vue-router';
// import 'vhtml-ui/lib/theme-default/index.css';
import App from './App.vue';
// import store from '../../call/store';
// import guardEvent from 'src/utils/guardEvent';
// import store from 'src/pages/call/store';
// import createHistory from 'history/createBrowserHistory';

vhtml.install(Vue);
Vue.use(vhtml);
Vue.use(VueRouter);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    render(h) {
        return h(App);
    }
}).$mount('#app');
