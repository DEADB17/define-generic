/*eslint strict:[2,"global"]*/

'use strict';


/**
 * @module define-generic
 */


/**
 * Creates a generic function
 * @alias module:define-generic
 * @param {Object} methods Record to hold the methods.
 * @param {function(methods, arguments[])} getMethod
 * Getter that maps arbitrary arguments to a method in the methods record.
 * @param {function(methods, arguments[])} setMethod
 * Setter that maps arbitrary arguments to a method in the methods record.
 * @param {function(method, arguments[])} applyMethod Function that maps arbitrary arguments to a method.
 * @param {function} defaultMethod Function to use when no method is found.
 * @returns {GenericFunction}
 */

module.exports = function create(methods, getMethod, setMethod, applyMethod, defaultMethod) {
    function generic(/* arguments */) {
        var meth = getMethod(methods, arguments);
        var fn = typeof meth === 'function' ? meth : defaultMethod;
        return applyMethod(fn, arguments);
    }

    generic.put = function put(/* fn, arguments */) {
        setMethod(methods, arguments);
        return generic;
    };

    return generic;
};


/**
 * @typedef {function} GenericFunction
 * @param {...*} [arguments] Arguments to the generic function.
 * Conventionally the first parameter is an object when dispatching on type.
 * @returns {*} Whatever the specific or default method returns.
 * @prop {GenericFunction-put} put
 */

/**
 * @callback GenericFunction-put
 * @param {function} fn The function to use as method.
 * @param {...*} [arguments] The parameters to apply to the method.
 * @returns {GenericFunction} An instance for chaining calls.
 */
