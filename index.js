/*eslint strict:[2,"global"]*/

'use strict';

function applyGeneric(selector, methods, args) {
    var key = selector.apply(null, args);
    var fn = methods[key];
    if (typeof fn !== 'function') throw new TypeError(key + ' is not a function');
    return fn.apply(null, args);
}

function defineGeneric(selector, methods) {
    return function generic(/* arguments */) {
        return applyGeneric(selector, methods, arguments);
    };
}

module.exports = defineGeneric;
