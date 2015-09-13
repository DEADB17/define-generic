/*eslint strict:[2,"global"]*/

'use strict';

function applyGeneric(methods, selector, args) {
    var fn = selector(methods, args);
    if (typeof fn !== 'function') throw new TypeError(fn + ' is not a valid method');
    return fn.apply(null, args);
}

function defineGeneric(methods, selector) {
    function generic(/* arguments */) {
        return applyGeneric(methods, selector, arguments);
    }

    generic.for = function forGeneric(key, fn) {
        methods[key] = fn;
        return generic;
    };

    generic.implements = function implementsGeneric(/* arguments */) {
        return typeof selector(methods, arguments) === 'function';
    };

    return generic;
}

module.exports = defineGeneric;
