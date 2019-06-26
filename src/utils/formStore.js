import store from './store';
const FORM = 'form';
let l = window.location;
function getName() {
    return `${window.PAGE_DATA.info.nameAccount}${l.origin}${l.pathname}${l.search}`;
}
store.set(FORM, store.get(FORM) || {});

export default {
    get() {
        let res = store.get(FORM)[getName()];
        return res;
    },

    clear() {
        return this.set(void 0);
    },

    set(data) {
        let list = store.get(FORM);
        let res = data;
        if (res === void 0) {
            delete list[getName()];
        }
        else {
            if (l.search) {
                for (let i in list) {
                    if (i.indexOf('?') > -1) {
                        delete list[i];
                    }
                }
            }
            list[getName()] = res;
        }
        return store.set(FORM, list);
    }
};
