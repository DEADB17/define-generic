/**
 * @private
 * @arg {*} fn Value to check if it is a function.
 * @arg {*} alt Alternative.
 * @return {function|*} The first argument if it is a function, the second otherwise.
 */
function check(fn, alt) {
    'use strict';
    return typeof fn === 'function' ? fn : alt;
}


/**
 * @private
 * @arg {function} fn Method.
 * @arg {Array} args Arguments.
 * @return {*} Any.
 */
function applyNull(fn, args) {
    'use strict';
    return fn.apply(null, args);
}


/**
 * @private
 * Function to use as a default method. Just throws an error.
 * @throws {ReferenceError} No such method.
 * @return {void}
 */
function error() {
    'use strict';
    throw new ReferenceError('No such method');
}


/** @typedef {*} methods */

/** @typedef {function} method */

/**
 * Function to select a specific method from the set of methods based on the arguments.
 * @callback getMethod
 * @arg {methods} methods Data structure to hold the methods.
 * @arg {Array} args Arguments array.
 * @return {method} Method to invoke.
 */

/**
 * Function that applies arbitrary arguments to a method.
 * @callback applyMethod
 * @arg {method} method Method to use.
 * @arg {Array} args Arguments array to apply to the method.
 * @return {*} Any value.
 */

/**
 * Creates a generic function
 * @arg {Object} spec
 * Specification.
 * @arg {getMethod} spec.getMethod
 * Function to select a specific method from the set of methods based on the arguments.
 * @arg {applyMethod} [spec.applyMethod=applyNull]
 * Function that applies arbitrary arguments to a method.
 * @arg {method} [spec.defaultMethod=error]
 * Function to use when no method is found.
 * @arg {methods} methods
 * Data structure to hold the methods.
 * @return {function} Generic function.
 */
function create(spec, methods) {
    'use strict';

    var getMethod = check(spec.getMethod, false);
    var applyMethod = check(spec.applyMethod, applyNull);
    var defaultMethod = check(spec.defaultMethod, error);

    if (getMethod === false) {
        throw new TypeError('spec.getMethod must be a Function');
    }

    return function generic(/* arguments */) {
        var method = getMethod(methods, arguments);
        var fn = typeof method === 'function' ? method : defaultMethod;
        return applyMethod(fn, arguments);
    };
}

module.exports = create;
