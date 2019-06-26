import Vue from 'vue';
import io from 'socket.io-client';
import LoginBase from '../components/Login.vue';
import eventBus from './bus';

const BASE_PATH = '/call/websocket';

class Websocket {
    constructor(request, responseHandler) {
        // parse parameters
        if (!request) {
            return;
        }

        this.keys = [];
        if (Array.isArray(request)) {
            this.keys = request.map(a => a.url);
            this.request = request;
        }
        else {
            if (!request.url) {
                return;
            }
            this.request = [request];
            this.keys = [request.url];
        }

        this.responseHandler = responseHandler;

        this.initSocket();
    }

    initSocket() {
        this.socket = io.connect('/', {path: BASE_PATH});
        this.socket.on('connect', () => {
            this.socket.emit('request', this.request);
        });

        this.socket.on('response', (data) => {
            eventBus.$emit('request_end', -1);
            if (!data || data.length < 1) {
                return;
            }

            // check timeout
            let sample = data[this.keys[0]];
            if (sample && sample.code === 3) {
                this.close();

                if (!window.loginPanel) {
                    // check if full screen
                    let fullEleName = 'fullscreenElement';
                    if (document.webkitExitFullscreen) {
                        fullEleName = 'webkitFullscreenElement';
                    }
                    else if (document.mozCancelFullScreen) {
                        fullEleName = 'mozFullScreenElement';
                    }
                    else if (document.msExitFullscreen) {
                        fullEleName = 'msFullscreenElement';
                    }
                    let dock = document[fullEleName] ? '#full-login-placehoder' : '#login-placeholder';

                    let Login = Vue.extend(LoginBase);
                    window.loginPanel = new Login({el: dock});
                }
                window.loginPanel.source = 'websocket';
                window.loginPanel.open();
                return;
            }

            typeof this.responseHandler === 'function' && this.responseHandler(data);
        });
    }

    update(request, isReplace) {
        if (!request) {
            return;
        }

        if (isReplace === true) {
            this.request = Array.isArray(request) ? request : [request];
        }
        else {
            if (Array.isArray(request)) {
                request.forEach((req) => {
                    this._updateItem(req);
                });
            }
            else {
                this._updateItem(request);
            }
        }

        this.keys = this.request.map(a => a.url);

        this.socket.emit('request', this.request);
    }

    _updateItem(reqItem) {
        let exist = this.request.some((old) => {
            if (old.url === reqItem.url) {
                old.param = reqItem.param;
                return true;
            }
            return false;
        });
        if (!exist) {
            this.request.push(reqItem);
        }
    }

    close() {
        this.socket.close();
    }
}

function createInstance(req, handler) {
    eventBus.$emit('request_start', -1);
    return new Websocket(req, handler);
}

Vue.prototype.$getSocket = createInstance;

export default Vue.prototype.$getSocket;
