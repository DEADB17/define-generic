/*eslint strict:0*/

/**
 * Creates a generic function
 * @arg {function(methods, arguments[])} getMethod
 * Getter that maps arbitrary arguments to a method in the methods record.
 * @arg {function(method, arguments[])} applyMethod
 * Function that maps arbitrary arguments to a method.
 * @arg {function} defaultMethod
 * Function to use when no method is found.
 * @arg {*} methods Data structure to hold the methods.
 * @return {function(...*)} Generic function.
 */

module.exports = function create(getMethod, applyMethod, defaultMethod, methods) {
    return function generic(/* arguments */) {
        var meth = getMethod(methods, arguments);
        var fn = typeof meth === 'function' ? meth : defaultMethod;
        return applyMethod(fn, arguments);
    };
};
