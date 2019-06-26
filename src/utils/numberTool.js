import moment from 'moment';

function isNaN(v) {
    // eslint-disable-next-line
    return v !== v;
}

const numberTool = {
    /**
     * 将秒数格式化为时间形式
     * @param  {string | number} value 输入数据
     * @param  {string} defaultAcc 精确度输入数据（如：
     * 精确度为second,则当小时，和分钟上都没有数据时，则只显示
     * 如25.当分钟上有数据时，则显示01：25而当精确度为minute时，
     * 则为 04：45
     * @return {string}       格式化后的时间字符串
     */
    toTime: function (value, defaultAcc = 'minute') {
        value = parseInt(value, 10);
        // let result = '-';
        let resultStr = '';
        if (value >= 0) {
            let second = value % 60;
            let secondS = second < 10 ? '0' + second : second;
            let minute = parseInt(value / 60, 10);
            let hour = parseInt(minute / 60, 10);
            minute = minute % 60;
            let minuteS = minute < 10 ? '0' + (minute % 60) : minute % 60;
            let hourS = hour < 10 ? '0' + hour : hour;
            switch (defaultAcc) {
                case 'second':
                    if (hour && minute) {
                        resultStr = hourS + ':' + minuteS + ':' + secondS;
                    }
                    else if (!hour && minute) {
                        resultStr = minuteS + ':' + secondS;
                    }
                    else {
                        resultStr = secondS;
                    }
                    break;
                case 'minute':
                    if (hour) {
                        resultStr = hourS + ':' + minuteS + ':' + secondS;
                    }
                    else {
                        resultStr = minuteS + ':' + secondS;
                    }
                    break;
                case 'hour':
                    resultStr = hourS + ':' + minuteS + ':' + secondS;
                    break;
                default:
                    resultStr = hourS + ':' + minuteS + ':' + secondS;
                    break;
            }
        }
        return resultStr;
    },

    /**
     * 格式化日期
     * @param  {number | string} value     日期的秒数形式
     * @return {string}           格式化后的日期字符串
     */
    toHour: function (value) {
        if (value !== null && +value >= 0) {
            let hour = moment.unix(+value).hour().toString();
            if (hour.length === 1) {
                hour = '0' + hour;
            }
            return hour + ':00';
        }
        return '-';
    },

    /**
     * 格式化时间
     * @param  {number | string} value     时间的秒数形式
     * @return {string}           格式化后的时间字符串
     */
    toHourMinute: function (value) {
        if (value !== null && +value >= 0) {
            let hour = moment.unix(+value).hour().toString();
            let min = moment.unix(+value).minute().toString();
            if (hour.length === 1) {
                hour = '0' + hour;
            }
            if (min.length === 1) {
                min = '0' + min;
            }
            return hour + ':' + min;
        }
        return '-';
    },

    /**
     * 格式化日期
     * @param  {number | string} value     日期的秒数形式
     * @return {string}           格式化后的日期字符串
     */
    toHourRange: function (value) {
        if (value !== null && +value >= 0) {
            let hour = moment.unix(+value).hours();
            return hour + '时-' + (hour + 1) + '时';
        }
        return '-';
    },

    /**
     * 格式化日期
     * @param  {number | string} value     日期的秒数形式
     * @param  {string} formatter 期望格式化的形式
     * @return {string}           格式化后的日期字符串
     */
    toDateString: function (value, formatter = 'YYYY-MM-DD') {
        return (value !== null && +value >= 0) ? moment.unix(+value).format(formatter) : '-';
    },

    /**
     * 计算时间差
     * @param  {number | string} eTime 起始时间的秒数形式
     * @param  {number | string} sTime 结束时间的秒数形式
     * @return {object}       {days: 'xx', hours: 'xx'}
     */
    hoursToX: function (eTime, sTime) {
        sTime = sTime ? moment.unix(+sTime) : moment();
        const duration = moment.unix(+eTime).diff(sTime, 'hours');
        return {
            days: parseInt(duration / 24, 10),
            hours: duration % 24
        };
    },

    /**
     * 格式化为百分比形式，支持负数
     * @param  {string | number} value  输入数据
     * @param  {number}         digit 小数点后保留位数
     * @return {string}               格式化后的百分比字符串
     */
    toPercent: function (value, digit = 2) {
        if (value !== null && typeof +value === 'number' && !isNaN(+value)) {
            return (+value * 100).toFixed(digit) + '%';
        }
        return '-';
    },

    /**
     * 将数字转换为千分撇形式
     * @param  {string | number} value 输入数据
     * @return {string}      格式化后的字符串
     */
    toComma: function (value) {
        if (value !== null && +value >= 0) {
            value = value.toString();
            let numberRE = /(\d+)(\d{3})/g;
            let num = value.split('.');
            value = num[0];
            let decimal = num[1];
            while (numberRE.test(value)) {
                value = value.replace(numberRE, '$1' + ',' + '$2');
            }

            if (decimal) {
                decimal = decimal.substring(0, 2);
                value += '.' + decimal;
            }
            return value;
        }
        return '-';
    },

    toUnit: function (value) {
        if (value !== null && +value >= 0) {
            if (value > 10000) {
                value = value.toFixed(0);
                let numberRE = /(\d+)(\d{3})/g;
                let units = [{name: '亿', value: 99999999}, {name: '万', value: 99999}];
                let numberUnit = '';
                let unit = {};
                for (let i = 0; i < units.length; i++) {
                    unit = units[i];
                    if (+value > unit.value) {
                        if (unit.name === '万') {
                            numberUnit = ((+value) / (unit.value - 90000 + 1)).toFixed(1) + '';
                        }
                        else {
                            numberUnit = ((+value) / (unit.value + 1)).toFixed(1) + '';
                        }
                        numberUnit = numberUnit.replace(/\.0$/, '') + unit.name;
                        return numberUnit;
                    }
                }
                while (numberRE.test(value)) {
                    value = value.replace(numberRE, '$1' + ',' + '$2');
                }
                return value;
            }
            else {
                value = value.toString();
                let num = value.split('.');
                value = num[0];
                let decimal = num[1];
                if (decimal) {
                    decimal = decimal.substring(0, 2);
                    value += '.' + decimal;
                }
                return value;
            }
        }
        return '-';
    },

    toTel: function (phone) {
        if (!phone) {
            return '-';
        }
        let phoneReg = /^1[3-9]\d{9}$/;
        // eslint-disable-next-line
        let areaReg = /(^10|^2\d|^(3[1-5]|37|39|4[1-3]|4[5-8]|5[1-9]|63|66|69|7[0-7]|79|8[1-3]|85|8[7-9]|90|91|9[3-5]|97|99)[0-9])/;
        let tel = String(phone) || '';
        tel = tel.replace(/^\+?0086|^\+86/, '');
        tel = phoneReg.test(tel) ? tel.replace(/(\d{3})(\d{4})(\d{4})/, '$1 $2 $3')
            : tel.replace(areaReg, '0$1 ').replace(/(\d{4})$/, ' $1');
        return tel;
    },

    /**
     * 将秒转成 00：00：00
     * @param  {string | number} input 秒为单位
     * @return {string}      格式化后的字符串
     */
    toTimeRange: function (input) {
        input = parseInt(input, 10);
        var result = '-';
        if (input >= 0) {
            var second = input % 60;
            var secondS = second < 10 ? '0' + second : second;
            var minute = parseInt(input / 60, 10);
            var hour = parseInt(minute / 60, 10);
            minute = minute % 60;
            var minuteS = minute < 10 ? '0' + (minute % 60) : minute % 60;
            var hourS = hour < 10 ? '0' + hour : hour;
            result = hourS + ':' + minuteS + ':' + secondS;
        }
        return result;
    }
};

export default numberTool;
