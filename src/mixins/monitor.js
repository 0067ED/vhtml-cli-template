/**
 * @File:   华佗上报统一mixin
 * @Author: erwinqiu
 * @Date:   2017-07-31
 */

import '../utils/bus';
import speedMonitor from '../utils/speedMonitor';

export default {
    beforeCreate() {

        if (process.env.NODE_ENV === 'development') {
            this.$nextTick(() => {
                if (!this._isRouteComponent) {
                    // eslint-disable-next-line
                    console.error(
                        `监测到非页面组件${this.$options.__file}添加了测速监控\n`
                      + ` 请移除以下代码\n`
                      + `  import monitor from 'src/mixins/monitor';\n`
                      + `  mixins: [monitor]`
                    );
                }
            });
        }

        this.requestsForMonitor = [];
        // 在这里定义handler是因为在beforeCreate里methods还没有被创建
        this.handleMonitorRequestStart = (requestId) => {
            this.requestsForMonitor.push(requestId);
        };

        this.handleMonitorRequestEnd = (requestId) => {
            let position = this.requestsForMonitor.indexOf(requestId);
            // 不在监测数组里，不做处理
            if (~position) {
                this.requestsForMonitor.splice(position, 1);
                // 当且仅当，所有ajax已经返回，且已经mounted，再发送。
                if (!this.requestsForMonitor.length && this.mountedForMonitor) {
                    this.$nextTick(() => {
                        speedMonitor.pageReady();
                    });
                }
            }
        };

        this.$eventBus.$on('request_start', this.handleMonitorRequestStart);
        this.$eventBus.$on('request_end', this.handleMonitorRequestEnd);
    },

    mounted() {
        this.$nextTick(() => {
            let renderTime = speedMonitor.pageShow();
            this.mountedForMonitor = true;
            this.$eventBus.$off('request_start');

            if (window.emonitorIns && renderTime) {
                // 页面首次打开时 renderTime 为 NaN，这时不需要上报，避免重复
                // 上报啄木鸟监控平台
                window.emonitorIns.send({
                    time7: renderTime
                }, false, 'https://btrace.qq.com/kvcollect?BossId=6529&Pwd=1714580587');
            }

            if (!this.requestsForMonitor.length) {
                this.$nextTick(() => {
                    speedMonitor.pageReady();
                });
            }
        });
    },

    beforeDestroy() {
        // 销毁前，off所有事件处理，以免内存泄漏
        this.$eventBus.$off('request_start', this.handleMonitorRequestStart);
        this.$eventBus.$off('request_end', this.handleMonitorRequestEnd);
    },

    beforeRouteLeave(to, from, next) {
        speedMonitor.routeLeave();
        next();
    }
};
