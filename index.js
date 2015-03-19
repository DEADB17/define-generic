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
    function appl() {
		var fun, obj = arguments[0], type = typeof obj;
        if (type !== 'object' && type !== 'function' || obj === null ) {
            throw new TypeError('First argument is not an object');
        }
		fun = obj[methodId] || defaultFun;
		return fun.apply(obj, arguments);
    }
    appl.addMethod = function (obj, fun) {
		return defineProperty(obj, methodId, {value: fun});
    };
    appl.isImplemented = function (obj) {
        return methodId in obj;
    };
    appl.defineGeneric = defineGeneric;
    return appl;
};
