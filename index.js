/*eslint strict:[2,"global"]*/

'use strict';

function applyGeneric(methods, selector, args) {
    var key = selector.apply(null, args);
    var fn = methods[key];
    if (typeof fn !== 'function') throw new TypeError(key + ' is not a function');
    return fn.apply(null, args);
}

function defineGeneric(methods, selector) {
    return function generic(/* arguments */) {
        return applyGeneric(methods, selector, arguments);
    };
}

module.exports = defineGeneric;
