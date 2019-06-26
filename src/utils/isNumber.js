'use strict';

import classof from './classof';

export default function (num) {
    switch (classof(num)) {
        case 'Number':
            return Math.floor(num) === num;
        case 'String':
            return /^[+|-]?[0-9]+$/.test(num);
        default:
            return false;
    }
}
