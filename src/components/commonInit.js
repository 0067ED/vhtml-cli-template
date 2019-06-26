import Vue from 'vue';
import * as Dom from '../utils/dom';
import Cookie from '../utils/cookie';
import debounce from '../utils/debounce';
import load from '../utils/loadResource';
import PwdBase from './ModifyPwd.vue';
import Star4sEntry from './commonInit-star4s.vue';
// import htmlEscape from '../utils/htmlEscape';
// import ajax from '../utils/ajax';

// require outside module ptlogin.js
const PTLOGIN_JS_SRC = 'https://ui.ptlogin2.qq.com/js/ptloginout.js';

const COOKIE_ARRAY = ['s_wpa', 's_pho', 's_rcp'];

const global = window;

// internal functions
function logout() {
    if (!global.pt_logout) {
        load(PTLOGIN_JS_SRC, function () {
            // exports.logout();
            logout();
        });
        return;
    }

    // call pt logout function
    global.pt_logout.logout(function (state) {
        if (state) {
            // logger.info('[PTLogin][logout] logout succeed');
            // exports.trigger('logout');
            // 退出时删除用于tab同步的cookie
            COOKIE_ARRAY.forEach(function (item) {
                Cookie.del(item);
            });

            window.location.href = '/ac/login';
        }
        else {
            // logger.warn('[PTLogin][logout] logout failed! state:' + state);
        }
    });
}
function detectBrowserScale() {
    let ratio = 1;
    let screen = window.screen;
    let ua = navigator.userAgent.toLowerCase();

    // ie：
    // ie8+都适用此法；ie7-不支持缩放网页不需考虑
    if (screen.deviceXDPI && screen.logicalXDPI) {
        ratio = screen.deviceXDPI / screen.logicalXDPI;
    }
    // pc端firefox，或者pc端ie之外的没有window.outerWidth和window.innerWidth的（非webkit的）非ie浏览器：
    // pc上所有非视网膜屏适用此法
    // 对pc上有视网膜屏的会有bug（正常模式时扔显示提示框）
    // 当pc端视网膜屏设备普及后应放弃此法
    else if (ua.indexOf('macintosh') === -1 && window.devicePixelRatio) {
        ratio = window.devicePixelRatio;
        // alert('devicePixelRatio: ' + Math.round(ratio * 100));
    }
    // ie之外，非firefox，且有window.outerWidth和window.innerWidth的（webkit）浏览器：
    // firefox的outerWidth和innerWidth永远相等故此法不通
    // 查看详情时会出bug（正常模式时扔显示提示框），但正常用户不会查看详情调试
    else if (ua.indexOf('firefox') === -1 && window.outerWidth && window.innerWidth) {
        ratio = window.outerWidth / window.innerWidth;
        // alert('outerWidth: ' + window.outerWidth + '; innerWidth: '
        //      + window.innerWidth + ' ratio: ' + Math.round(ratio * 100));
    }
    // mac端firefox暂不支持此法

    if (ratio) {
        ratio = Math.round(ratio * 100);
    }
    return ratio;
}
function adjustTopHintBar() {
    let r = detectBrowserScale();
    let strRet = '';
    let hintBar = document.getElementById('gb-hintbar');
    let slide = document.getElementById('slide');

    if (r > 101) {
        strRet = '放大' + strRet;
    }
    else if (r < 99) {
        strRet = '缩小' + strRet;
    }
    else {
        if (hintBar) {
            hintBar.style.display = 'none';
            if (slide) {
                Dom.removeClass(slide, 'slide-adjust-90');
            }
        }
        return;
    }

    if (!hintBar) {
        /* eslint-disable */
        let h = `<div class="inner">
            <div class="hintbar-txt">您的浏览器目前处于<span id="hintbar-txt">${strRet}</span>状态，会导致页面显示不正常，您可以键盘按"ctrl+数字0"组合键恢复初始状态。
            <a href="javascript:;" id="stop-remind-nav" >不再提示</a></div>
        <div>`;
        /* eslint-enable */

        let hintBar = document.createElement('div');
        hintBar.id = 'gb-hintbar';
        hintBar.setAttribute('class', 'gb-hintbar');
        hintBar.innerHTML = h;
        document.body.insertBefore(hintBar, document.querySelector('.header'));

        hintBar.addEventListener('click', () => {
            Cookie.set('zoomDetect', '1');
            hintBar.parentNode.removeChild(hintBar);

            slide = document.getElementById('slide');
            if (slide) {
                Dom.removeClass(slide, 'slide-adjust-90');
            }
        });
    }
    else {
        document.getElementById('hintbar-txt').innerText = strRet;
        document.getElementById('gb-hintbar').style.display = '';
    }
    if (slide) {
        Dom.addClass(slide, 'slide-adjust-90');
    }
}
// 通用初始化之-售后服务调查入口是否显示逻辑
function _commonInit_star4s() {
    const header = document.querySelector('body > .header');
    if (header.length === 0) return;
    /**
     * 没有header时，不用执行以下逻辑
     */
    const el_id = 'star4s-placeholder';
    const el = document.createElement('div');
    el.setAttribute('id', el_id);
    header.appendChild(el);

    new Vue({
        el: '#' + el_id,
        render(createElement) {
            return createElement(
                Star4sEntry
            );
        }
    });
}

export default function () {
    /**
     * block 1, for login/logout
     */
    document.querySelector('.header-logout').addEventListener('click', () => {
        logout();
    });
    /**
     * block end
     */

    /**
     * block 2, for side menu
     */
    let slide = document.getElementById('slide');
    if (slide) {
        document.addEventListener('click', (e) => {
            let el = e.target;

            if (!(slide !== el && slide.contains(el)) && !Dom.hasClass(slide, 'slide-unopen')) {
                Dom.addClass(slide, 'slide-unopen');
                slide.removeAttribute('style');
            }
        });

        slide.querySelector('.slide-toggle').addEventListener('click', () => {
            let pageHeight = document.querySelector('.page').offsetHeight;
            let slideFullHeight = slide.querySelector('.slide-full').offsetHeight;
            let slideOpenHeight = slideFullHeight + slide.querySelectorAll('dt').length * 30;
            if (slideOpenHeight > pageHeight) {
                // 因为slide-full定位为absolute,所以如果菜单展开后大于当前page节点的高度，需要给slide设置高度
                slide.setAttribute('height', slideOpenHeight);
            }
            Dom.removeClass(slide, 'slide-unopen');
            Dom.addClass(slide, 'qidian-slide-open');
        });
    }
    /**
     * block end
     */

    /**
     * block 3, for hint bar
     */
    if (Cookie.get('zoomDetect') !== '1') {
        let adjust = debounce(function () {
            Cookie.get('zoomDetect') === '1' || adjustTopHintBar();
        }, 200);

        adjust();
        window.addEventListener('resize', adjust);
    }
    /**
     * block end
     */

    /**
     * block 4, for avatar info
     */
    let avatarArea = document.querySelector('.avatar-area');
    let avatar = avatarArea.querySelector('.avatar');
    let isAdmin = Dom.hasClass(avatar, 'is-admin');

    let tipDiv = document.createElement('div');
    const tipBaseStyle = 'margin-top:6px;margin-left:-26.5px;position:absolute;z-index:999;';
    /* eslint-disable */
    let t = isAdmin
        ? '<div class="lbf-tip-content" style="padding-top:7px;"><ul id="headerAvatarTipUl"><li><a href="https://aq.qq.com" target="_blank">修改密码</a></li></div>'
        : '<div class="lbf-tip-content" style="padding-top:7px;"><ul id="headerAvatarTipUl"><li><a href="javascript:void(0);" id="avatarModifyPwd">修改密码</a></li></div>';
    /* eslint-enable */
    tipDiv.innerHTML = t;
    tipDiv.setAttribute('class', 'avatar-tip');
    tipDiv.setAttribute('style', tipBaseStyle + 'display:none;');
    document.body.appendChild(tipDiv);
    setTimeout(_commonInit_star4s);

    let hideTimer = 0;
    let hideTip = function () {
        let style = tipBaseStyle + 'display:none;';
        tipDiv.setAttribute('style', style);
        hideTimer = 0;
    };

    avatarArea.addEventListener('mouseenter', () => {
        if (hideTimer) {
            clearTimeout(hideTimer);
            hideTimer = 0;
            return;
        }

        let boundingRect = avatarArea.getBoundingClientRect();
        let style = tipBaseStyle + `top:${boundingRect.top + boundingRect.height}px;left:${boundingRect.left}px`;
        tipDiv.setAttribute('style', style);
    });
    avatarArea.addEventListener('mouseleave', () => {
        hideTimer = setTimeout(hideTip, 300);
    });
    tipDiv.addEventListener('mouseenter', () => {
        if (hideTimer) {
            clearTimeout(hideTimer);
            hideTimer = 0;
        }
    });
    tipDiv.addEventListener('mouseleave', () => {
        hideTimer = setTimeout(hideTip, 300);
    });

    if (!isAdmin) {
        let loginName = avatarArea.querySelector('.header-info-name').innerText;
        let phone = avatar.getAttribute('data-phone');
        let component;

        if (!phone) {
            component = new Vue({
                el: '#pwd-placeholder',
                data() {
                    return {
                        open: false
                    };
                },

                render(createElement, context) {
                    return createElement(
                        'v-dialog',
                        {
                            ref: 'alert',
                            props: {
                                title: '无法修改密码',
                                kind: 'alert',
                                open: this.open
                            },
                            on: {
                                input: (e) => {
                                    this.open = e;
                                }
                            }
                        },
                        [
                            createElement('p',
                                [
                                    '账号',
                                    createElement('span', {attrs: {class: 'name'}}, loginName),
                                    '没有绑定有效的手机号，',
                                    createElement('br'),
                                    '请先使用客户端绑定手机。'
                                ]
                            )
                        ]
                    );
                }
            });
        }
        else {
            component = new Vue({
                el: '#pwd-placeholder',
                render(createElement) {
                    return createElement(
                        PwdBase,
                        {
                            ref: 'modifier',
                            props: {
                                phoneNumber: phone,
                                loginName: loginName
                            }
                        }
                    );
                }
            });
        }

        let trigger = document.getElementById('avatarModifyPwd');
        trigger.addEventListener('click', () => {
            phone ? component.$refs.modifier.open() : component.open = true;
        });
    }
    /**
     * block end
     */

     /**
      * block 5, for message bar
      */
    // ajax.get('/ea/mails/topinfo').then(function (data) {
    //     if (data && data.data && data.data.id) {
    //         var newMessage = [
    //             '   <div class="gb-message-bar-inner">',
    //             '      <i class="icon-message-green"></i>',
    //             '      <span class="gb-message-abstract">' + htmlEscape.htmlEncode(data.data.abstract) + '</span>',
    //             '      <a class="gb-message-detail" target="_blank" href="/ea/mails/detail?id=' + data.data.id + '">了解更多</a>',
    //             '   </div>'
    //         ].join('');
    //
    //         let messageBar = document.createElement('div');
    //         messageBar.id = 'message-hintbar';
    //         messageBar.setAttribute('class', 'gb-message-bar');
    //         messageBar.innerHTML = newMessage;
    //         document.body.insertBefore(messageBar, document.querySelector('.header'));
    //
    //         if (messageBar.addEventListener) {
    //             messageBar.addEventListener('click', function () {
    //                 messageBar.parentNode.removeChild(messageBar);
    //             });
    //         }
    //     }
    //     if (data && data.data && data.data.unread) {
    //         document.querySelector('.header .header-message .header-message-unread').style.display = 'block';
    //         // $('.header .header-message .header-message-unread').show();
    //     }
    // });
     /**
       * block end
       */
}
