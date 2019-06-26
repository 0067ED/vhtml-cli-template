import stationTools from './stationInfo';
export default function qidianDAWithSite(cat, act, label) {
    let site = stationTools.getStationInfo();
    let suffix = typeof label === 'undefined' ? '' : `$${label}`;
    window.qidianDA('send', 'event', cat, typeof act === 'undefined' ? '' : act, `_p=${site}${suffix}`);
}
