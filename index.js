/*eslint strict:[2,"global"]*/

'use strict';

var defineProperty = Object.defineProperty || function defineProperty(obj, prop, desc) {
    obj[prop] = desc.value;
    return obj;
};

function noMethod() {
    throw new ReferenceError('No such method');
}

function defineGeneric(methodId, defaultFun) {
    var defaultFn = typeof defaultFun !== 'function' ? noMethod : defaultFun;
    function appl() {
        var fun, obj = arguments[0], type = typeof obj;
        if (type !== 'object' && type !== 'function' || obj === null) {
            throw new TypeError('First argument is not an object');
        }
        fun = obj[methodId] || defaultFn;
        return fun.apply(obj, arguments);
    }
    appl.addMethod = function addMethod(obj, fun) {
        return defineProperty(obj, methodId, { value: fun });
    };
    appl.isImplemented = function isImplemented(obj) {
        return methodId in obj;
    };
    appl.defineGeneric = defineGeneric;
    return appl;
}

module.exports = defineGeneric;
