(function () {
    const pathName = window.location.pathname;

    document.addEventListener('mousedown', function (e) {
        try {
            const target = e.target || e.srcElement;
            const value = target.getAttribute && target.getAttribute('qda-open-click') || null;
            if (value) {
                // console.log(`${pathName}__${value}`);
                let t = `${pathName}__${value}`;
                /* eslint-disable no-undef */
                kf && (t = `_uin=${kf.uin}&loginUin=${kf.loginUin}--` + t);
                window.qidianDA && window.qidianDA('send', 'event', 'open', 'click', t);
            }
        } catch (e) { }
    }, false);
})();
