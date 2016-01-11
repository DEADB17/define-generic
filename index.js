/*eslint strict:0*/

/** @typedef {*} methods */

/** @typedef {function} method */

/**
 * Function to select a specific method from the set of methods based on the arguments.
 * @callback getMethod
 * @arg {methods} methods Data structure to hold the methods.
 * @arg {*[]} args Arguments array.
 * @return {method} Method to invoke.
 */

/**
 * Function that applies arbitrary arguments to a method.
 * @callback applyMethod
 * @arg {method} method Method to use.
 * @arg {*[]} args Arguments array to apply to the method.
 * @return {*} Any value.
 */

/**
 * Creates a generic function
 * @arg {getMethod} getMethod
 * Function to select a specific method from the set of methods based on the arguments.
 * @arg {applyMethod} applyMethod
 * Function that applies arbitrary arguments to a method.
 * @arg {method} defaultMethod
 * Function to use when no method is found.
 * @arg {methods} methods Data structure to hold the methods.
 * @return {function} Generic function.
 */

module.exports = function create(getMethod, applyMethod, defaultMethod, methods) {
    return function generic(/* arguments */) {
        var method = getMethod(methods, arguments);
        var fn = typeof method === 'function' ? method : defaultMethod;
        return applyMethod(fn, arguments);
    };
};
