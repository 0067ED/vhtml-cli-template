function getStationInfo() {
    let stationMap = {
        10002: 'xt', // 协同标准版
        10003: 'fw', // 服务标准版
        10007: 'fw', // 服务企业版
        10009: 'fw', // 服务专业版
        10005: 'cc', // 电话标准版
        10015: 'cc', // 电话企业版
        10008: 'cc', // 电话专业版
        10004: 'ea', // 分析套餐
        10010: 'yx', // 营销企业版
        10018: 'yx', // 营销标准版
        10019: 'yx'  // 营销-销售智推版
    };
    // 返回当前子站的信息
    if (window.PAGE_DATA && window.PAGE_DATA.set) {
        return stationMap[window.PAGE_DATA.set.current] || '不存在该子站';
    }

    return '数据有错';

}
function hasStation(type) {
    let sets = (window.PAGE_DATA && window.PAGE_DATA.set.available) || [];
    for (let item of sets) {
        if (type === 'kf' && (item.type === 'cc' || item.type === 'fw')) {
            return true;
        }
        else if (type === item.type) {
            return true;
        }
    }
    return false;
}
const stationTools = {
    getStationInfo: getStationInfo,
    hasStation: hasStation
};
export default stationTools;
