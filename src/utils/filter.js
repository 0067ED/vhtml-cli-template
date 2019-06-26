import Vue from 'vue';
import Escaper from './htmlEscape';

// const parser = new DOMParser();

Vue.filter('decodeHTML', (value) => {
    if (!value || typeof value !== 'string') {
        return '';
    }

    // let doc = parser.parseFromString(value, 'text/html');
    // return doc.body.textContent;

    return Escaper.htmlDecode(value);
});
