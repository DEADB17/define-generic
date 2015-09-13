/*eslint strict:[2,"global"]*/

'use strict';

function applyGeneric(methods, selector, args) {
    var fn = selector(methods, args);
    if (typeof fn !== 'function') throw new TypeError(fn + ' is not a valid method');
    return fn.apply(null, args);
}

function defineGeneric(methods, selector) {
    return function generic(/* arguments */) {
        return applyGeneric(methods, selector, arguments);
    };
}

module.exports = defineGeneric;
