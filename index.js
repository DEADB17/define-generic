/*eslint strict:[2,"global"]*/

/**
 * @module define-generic
 */

'use strict';

function isFunction(fn) { return typeof fn === 'function'; }

function noMethod() { throw new ReferenceError('No such method'); }


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

function create(dispatcher, defaultMethod) {
    if (dispatcher == null) { // eslint-disable-line no-eq-null
        throw new ReferenceError('Missing methods object');
    } else if (!isFunction(dispatcher.get) || !isFunction(dispatcher.set)) {
        throw new TypeError('Expecting get and set functions in methods object');
    }


    var defaultMeth = isFunction(defaultMethod) ? defaultMethod : noMethod; // eslint-disable-line vars-on-top

    function generic(/* arguments */) {
        var fn = dispatcher.get(arguments);
        if (!isFunction(fn)) fn = defaultMeth;
        return dispatcher.app(fn, arguments);
    }

    generic.define = function define(/*fn, arguments */) {
        dispatcher.set(arguments);
        return generic;
    };

    generic.isDefined = function isDefined(/* arguments */) {
        return isFunction(dispatcher.get(arguments));
    };

    return generic;
}

module.exports = create;
