const htmlEscape = {
    /**
     * XSS过滤的函数
     * @param {string} str 字符串
     * @return {string} 过滤后的字符串
     */
    htmlEncode: function (str) {
        return (str + '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/'/g, '&#39;')
            .replace(/"/g, '&quot;')
            .replace(/ /g, '&nbsp;')
            .replace(/=/g, '&#61;')
            .replace(/`/g, '&#96;');
    },

    /**
     * 反转义
     * @param  {string} str 转义后的字符串
     * @return {string}     反转义后的字符串
     */
    htmlDecode: function (str) {
        return (str + '')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&#39;/g, "'")
            .replace(/&quot;/g, '"')
            .replace(/&nbsp;/g, ' ')
            .replace(/&#61;/g, '=')
            .replace(/&#96;/g, '`');
    }
};

export default htmlEscape;
