import Vue from 'vue';

if (!Vue.prototype.$eventBus) {
    Vue.prototype.$eventBus = new Vue();
}

export default Vue.prototype.$eventBus;
