import htmlEscape from '../utils/htmlEscape';
import ajax from '../utils/ajax';

export default function (to) {
    ajax.get('/ea/mails/topinfo').then(function (data) {
        let messageBar = document.querySelector('#message-hintbar');
        let messaceIcon = document.querySelector('.header .header-message .header-message-unread');
        // 如果没有message bar或者message icon， 直接返回不做处理。
        if (!messageBar || !messaceIcon) {
            return;
        }
        if (data && data.data && data.data.id && !messageBar) {
            // 消息详情页 消息id与顶部消息id一致时，不显示顶部消息
            if (!(to && to.name === 'detail' && to.query && +to.query.id === +data.data.id)) {
                var newMessage = [
                    '   <div class="gb-message-bar-inner">',
                    '      <i class="icon-message-green"></i>',
                    '      <span class="gb-message-abstract">' + htmlEscape.htmlEncode(data.data.abstract) + '</span>',
                    '      <a class="gb-message-detail" target="_blank" href="/ea/mails/detail?id=' + data.data.id + '">了解更多</a>',
                    '   </div>'
                ].join('');

                messageBar = document.createElement('div');
                messageBar.id = 'message-hintbar';
                messageBar.setAttribute('class', 'gb-message-bar');
                messageBar.innerHTML = newMessage;
                document.body.insertBefore(messageBar, document.querySelector('.header'));

                if (messageBar.addEventListener) {
                    messageBar.addEventListener('click', function () {
                        messageBar.parentNode.removeChild(messageBar);
                    });
                }
            }

        }
        else if (messageBar) {
            messageBar.parentNode.removeChild(messageBar);
        }

        if (data && data.data && data.data.unread) {
            messaceIcon && (messaceIcon.style.display = 'block');
            // $('.header .header-message .header-message-unread').show();
        }
        else {
            messaceIcon && (messaceIcon.style.display = 'none');
        }
    });
}
