/*eslint strict:[2,"global"], func-names:0, no-nested-ternary:0*/

'use strict';

var test = require('tape').test;
var createGeneric = require('./');

var slice = Array.prototype.slice;


test('createGeneric', function (t) {
    var getMethodType, a, b, c;

    function typeDispatcher() {
        var meths = {};
        return {
            get: function get(args) {
                return meths[args[0].type];
            },
            set: function set(args) {
                meths[args[1].type] = args[0];
            },
            app: function app(fn, args) {
                return fn.apply(args[0], slice.call(args, 1));
            }
        };
    }

    a = { type: 'A' };
    b = { type: 'B' };
    c = { type: 'C' };

    getMethodType = createGeneric(typeDispatcher(), function DEFAULT() { return 'DEAFAULT method'; });
    getMethodType.define(function A() { return 'A method'; }, a);
    getMethodType.define(function B() { return 'B method'; }, b);

    t.is(getMethodType(a), 'A method', 'applies A method');
    t.is(getMethodType(b), 'B method', 'applies B method');
    t.is(getMethodType(c), 'DEAFAULT method', 'applies DEAFAULT method');

    t.is(getMethodType.isDefined(a), true, 'method defined for A');
    t.is(getMethodType.isDefined(b), true, 'method defined for B');
    t.is(getMethodType.isDefined(c), false, 'method NOT defined for C');

    t.throws(createGeneric,
             /Missing methods object/,
             'throws: Missing methods object');
    t.throws(function () { createGeneric({}); },
             /Expecting get and set functions in methods object/,
             'throws: Expecting get and set functions in methods object');

    getMethodType = createGeneric(typeDispatcher());
    t.throws(function () { getMethodType(c); },
             /No such method/,
             'thows: No such method when missing default');

    t.end();
});
