// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/common/runBeforeRequire';
// import './runBeforeRequire';
import Vue from 'vue';
import vhtml from 'vhtml-ui';
import VueRouter from 'vue-router';
import configRouter from './route.config';
// import 'vhtml-ui/lib/theme-default/index.css';
import App from './App.vue';
// import store from '../../call/store';
import guardEvent from 'src/utils/guardEvent';

// import createHistory from 'history/createBrowserHistory';

vhtml.install(Vue);
Vue.use(vhtml);
Vue.use(VueRouter);
Vue.config.productionTip = false;

let routeConfig = {
    base: __dirname + 'examples/pages/index',
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

var alinks = document.querySelectorAll('#slide a');
var handler = function (e) {
    if (guardEvent(e)) {
        var url = e.currentTarget.getAttribute('href');
        url = url.substr(url.indexOf('/examples/pages/index') + '/examples/pages/index'.length);
        if (url && router.getMatchedComponents(url).length) {
            router.push(url);
            e.preventDefault && e.preventDefault();
        }
    }
};

for (var i = 0; i < alinks.length; i++) {
    var link = alinks[i];
    if (link.addEventListener) {
        link.addEventListener('click', handler);
    }
    else if (link.attachEvent) {
        link.attachEvent('onclick', handler);
    }
}
