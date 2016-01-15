var define = require('./');

/**
 * Generic function dispatched by constructor.
 * @arg {[[function, function]]} table
 * An array whose 1st element is the constructor function and the 2nd is the
 * method.
 * @return {function} Generic function.
 */
module.exports = function constructor(table) {
    'use strict';

    var spec = {
        getMethod: function getMethod(methodTab, args) {
            var key = args[0].constructor;
            var mtIndex = methodTab.index;
            var i, len;
            for (i = 0, len = mtIndex.length; i < len; i += 1) {
                if (key === mtIndex[i]) {
                    return methodTab.methods[i];
                }
            }
            return undefined;
        }
    };

    var methods = table.reduce(function f(acc, it, i) {
        acc.index[i] = it[0];
        acc.methods[i] = it[1];
        return acc;
    }, { index: [], methods: [] });

    return define(spec, methods);
};
