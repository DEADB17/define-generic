/*eslint strict:[2,"global"]*/

'use strict';

var has = Object.prototype.hasOwnProperty;

function error(key) {
    var message = 'No such method: ' + key;
    throw new ReferenceError(message);
}

function defineGeneric(getKey, methods, defaultKey, onError) {
    var defaultKey2 = defaultKey || '*';
    var onError2 = onError || error;
    return function appl(/* arguments */) {
        var fn, key = getKey.apply(getKey, arguments);
        if (has.call(methods, key)) { fn = methods[key]; }
        else if (has.call(methods, defaultKey2)) { fn = methods[defaultKey2]; }
        else { return onError2(key, getKey, methods, defaultKey2, onError2, arguments); }
        return fn.apply(fn, arguments);
    };
}

module.exports = defineGeneric;
