var define = require('./');

/**
 * Generic function dispatched by tag.
 * @arg {string} tagProperty Property name used for tag value.
 * @arg {Object.<string, function>} methods
 * Object whose keys are the tag-values and values are methods.
 * @return {function} Generic function.
 */
module.exports = function tagged(tagProperty, methods) {
    'use strict';

    var spec = {
        getMethod: function getMethod(methodTab, args) {
            var key = args[0][tagProperty];
            return methodTab[key];
        }
    };

    return define(spec, methods);
};
