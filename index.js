/*eslint strict:[2,"global"]*/

'use strict';

var owns = Object.prototype.hasOwnProperty;

function defineGeneric(defaultKey, getKey, methods) {
    var defaultKey2 = defaultKey || '*';
    return function appl(/* arguments */) {
        var fn, key = getKey.apply(getKey, arguments);
        if (owns.call(methods, key)) { fn = methods[key]; }
        else if (owns.call(methods, defaultKey2)) { fn = methods[defaultKey2]; }
        else { throw new ReferenceError('No such method: ' + key); }
        return fn.apply(fn, arguments);
    };
}

module.exports = defineGeneric;
