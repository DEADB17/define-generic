var slice = Array.prototype.slice;

var defineProperty = Object.defineProperty || function (obj, prop, desc) {
    'use strict';
    obj[prop] = desc.value;
    return obj;
};

function noMethod() {
    'use strict';
    throw new ReferenceError('No such method');
}

module.exports = function defineGeneric(methodId, defaultFun) {
    'use strict';
    if (typeof defaultFun !== 'function') { defaultFun = noMethod; }
    var appl = function () {
	var obj = arguments[0];
        if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null ) {
            throw new TypeError('First argument is not an object');
        }
	var fun = obj[methodId] || defaultFun;
        var args = slice.call(arguments, 1);
	return fun.apply(obj, args);
    };
    appl.addMethod = function (obj, fun) {
	return defineProperty(obj, methodId, {value: fun});
    };
    appl.isImplemented = function (obj) {
        return methodId in obj;
    };
    appl.defineGeneric = defineGeneric;
    return appl;
};
