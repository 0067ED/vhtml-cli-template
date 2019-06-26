import moment from 'moment';

export default {
    data() {
        return {
            memorized: {},
            unwatch: []
        };
    },

    beforeMount() {
        this.restore();
        this.watch();
        this.memorizeResolve && this.memorizeResolve();
    },
    methods: {
        memorize(keys = []) {
            let promise = new Promise((resolve, reject) => {
                this.memorizeResolve = resolve;
                // this.reject = reject;
            });
            keys.forEach(memory => {
                let key = memory.key;
                !memory.name && this.generateMemoryName(memory);
                this.memorized[key] = memory;
            });
            return promise;
        },
        watch() {
            Object.keys(this.memorized).forEach(key => {
                let unwatch = this.$watch(key, newVal => {
                    this.setStore(key, newVal);
                });
                this.unwatch.push(unwatch);
            });
        },
        restore() {
            Object.values(this.memorized).forEach(memory => {
                let key = memory.key;
                let name = memory.name;
                let type = memory.type;
                let val = this.getStore(name, type);
                if (val !== null) {
                    this[key] = val;
                }
            });
        },
        setStore(key, val) {
            let memory = this.memorized[key] || {};
            let name = memory.name;
            let type = memory.type;
            switch (type) {
                case 'Array<Moment>':
                    let res = [];
                    val.forEach(m => {
                        res.push(m.format());
                    });
                    sessionStorage && sessionStorage.setItem(name, JSON.stringify(res));
                    break;
                default:
                    sessionStorage && sessionStorage.setItem(name, JSON.stringify(val));
            }
        },
        getStore(name, type) {
            let val = null;
            switch (type) {
                case 'Array<Moment>':
                    let store = sessionStorage && sessionStorage.getItem(name);
                    if (store) {
                        let value = JSON.parse(store);
                        val = [];
                        value.forEach(date => {
                            val.push(moment(date));
                        });
                    }
                    break;
                default:
                    val = sessionStorage && sessionStorage.getItem(name);
                    try {
                        val = JSON.parse(val);
                    }
                    catch (e) {
                        // 把字符串'"str"'转成'str'
                        val = (new Function('return (' + val + ')')());
                    }
            }
            return val;
        },
        generateMemoryName(memory) {
            let name = '';
            switch (memory.type) {
                case 'Array<Moment>':
                    name = 'datePicker';
                    break;
            }
            memory.name = name;
        }
    },
    beforeDestroy() {
        this.unwatch.forEach(unwatch => {
            unwatch();
        });
    }
};
