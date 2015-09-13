/*eslint strict:[2,"global"]*/

'use strict';

function defineGeneric(selector, methods) {
    return function app(/* arguments */) {
        var key = selector.apply(null, arguments);
        var fn = methods[key];
        if (typeof fn !== 'function') throw new TypeError(key + ' is not a function');
        return fn.apply(null, arguments);
    };
}

module.exports = defineGeneric;
