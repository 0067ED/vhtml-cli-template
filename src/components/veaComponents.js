
import commonSelect from './common-select';
import {listview, detailview} from '../meta';
import '../utils/ajax';
import vhtml from 'vhtml-ui';
import Vue from 'vue';

const sprites = require.context('../assets/icons', true, /[^\.]+\.svg$/);

Vue.use(vhtml);
vhtml.install(Vue);
vhtml.Icon.addSprites(sprites);

const components = [
    commonSelect,
    listview,
    detailview
];

export function install(Vue, opts = {}) {
    /* istanbul ignore if */
    if (install.installed) {
        return;
    }

    components.map(component => {
        if (!component.name) {
            return;
        }
        Vue.component(component.name, component);
    });
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}
window._veaComponents = {
    commonSelect,
    listview,
    detailview
};

module.exports.default = window._componentsVue;
