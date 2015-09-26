/*eslint strict:[2,"global"], func-names:0, no-nested-ternary:0*/

'use strict';

var test = require('tape').test;
var createGeneric = require('./');

var slice = Array.prototype.slice;


test('createGeneric', function (t) {
    var getMethodType;

    var a = { type: 'A' };
    var b = { type: 'B' };
    var c = { type: 'C' };

    var meths = {};

    function getMethod(methods, args) {
        return methods[args[0].type];
    }

    function setMethod(methods, args) {
        methods[args[1].type] = args[0];
    }

    function applyMethod(fn, args) {
        return fn.apply(args[0], slice.call(args, 1));
    }

    function defaultMethod() { return 'DEAFAULT method'; }

    getMethodType = createGeneric(meths, getMethod, setMethod, applyMethod, defaultMethod);
    getMethodType.define(function A() { return 'A method'; }, a);
    getMethodType.define(function B() { return 'B method'; }, b);

    t.is(getMethodType(a), 'A method', 'applies A method');
    t.is(getMethodType(b), 'B method', 'applies B method');
    t.is(getMethodType(c), 'DEAFAULT method', 'applies DEAFAULT method');

    t.is(getMethodType.isDefined(a), true, 'method defined for A');
    t.is(getMethodType.isDefined(b), true, 'method defined for B');
    t.is(getMethodType.isDefined(c), false, 'method NOT defined for C');

    t.end();
});
