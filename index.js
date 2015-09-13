/*eslint strict:[2,"global"]*/

'use strict';

function defineGeneric(getKey, methods) {
    return function appl(/* arguments */) {
        var key = getKey.apply(null, arguments);
        var fn = methods[key];
        if (typeof fn !== 'function') throw new TypeError(key + ' is not a function');
        return fn.apply(null, arguments);
    };
}

module.exports = defineGeneric;
