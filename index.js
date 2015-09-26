/*eslint strict:[2,"global"]*/

/**
 * @module define-generic
 */

'use strict';

/**
 * @typedef {Object} Dispatcher
 * @prop {Dispatcher-get} get
 * @prop {Dispatcher-set} set
 * @prop {Dispatcher-app} app
 */

/**
 * @callback Dispatcher-get
 * @param {Array} [args] The parameters to dispatch on
 */

/**
 * @callback {function} Dispatcher-set
 * @param {function} fn The function to use as method
 * @param {Array} [args] The parameters to dispatch on
 */

/**
 * @callback {function} Dispatcher-app
 * @param {function} fn The function to use as method
 * @param {Array} [args] The parameters to apply to the method
 */


/**
 * @typedef {function} GenericFunction
 * @param {...*} [arguments] The parameters that the Dispatcher getter and the returned method expect.
 * Conventionally the first parameter is an object when dispatching on type.
 * @prop {GenericFunction-define} define
 * @prop {GenericFunction-isDefined} isDefined
 */

/**
 * @callback GenericFunction-define
 * @param {function} fn The function to use as method
 * @param {...*} [arguments] The parameters to apply to the method
 */

/**
 * @callback GenericFunction-isDefined
 * @param {...*} [arguments] The parameters to identify the method
 */


/**
 * Create a generic function
 * @alias module:define-generic
 * @param {Dispatcher} dispatcher The dispatcher object
 * @param {function} [defaultMethod=noMethod] The method to use when dispatcher.get does not return a function.
 * Defaults to noMethod which throws a ReferenceError.
 * @returns {GenericFunction}
 */

var F = 'function';

function create(methods, getMethod, setMethod, applyMethod, defaultMethod) {
    function generic(/* arguments */) {
        var fn = getMethod(methods, arguments);
        if (typeof fn !== F) fn = defaultMethod;
        return applyMethod(fn, arguments);
    }

    generic.define = function define(/*fn, arguments */) {
        setMethod(methods, arguments);
        return generic;
    };

    generic.isDefined = function isDefined(/* arguments */) {
        return F === typeof getMethod(methods, arguments);
    };

    return generic;
}

module.exports = create;
