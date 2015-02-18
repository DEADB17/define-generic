'use strict';

var test = require('tape');
var defineGeneric = require('./');

test('defineGeneric', function (t) {
    var gf = defineGeneric('gf1');
    t.equal(typeof gf, 'function', 'it returns a function');
    t.equal(gf.length, 0, 'it returns an nary function');
    t.ok('addMethod' in gf, 'it has an "addMethod" method');
    t.ok('isImplemented' in gf, 'it has a "isImplemented" method');
    t.ok('defineGeneric' in gf, 'it has a "defineGeneric" method');
    t.throws(function () { gf(); }, TypeError, 'it throws a TypeError if no object is passed');
    t.throws(function () { gf(undefined); }, TypeError, 'it throws a TypeError if undefined is passed');
    t.throws(function () { gf(null); }, TypeError, 'it throws a TypeError if null is passed');
    t.throws(function () { gf(NaN); }, TypeError, 'it throws a TypeError if NaN is passed');
    t.throws(function () { gf(Infinity); }, TypeError, 'it throws a TypeError if Infinity is passed');
    t.throws(function () { gf(1); }, TypeError, 'it throws a TypeError if a number is passed');
    t.throws(function () { gf(''); }, TypeError, 'it throws a TypeError if a string is passed');
    t.throws(function () { gf({}); }, ReferenceError, 'it throws a ReferenceError if no method is defined');

    gf = defineGeneric('gf2', function () { return 'stub'; });
    t.doesNotThrow(function () { gf({}); },'it accepts objects');
    t.doesNotThrow(function () { gf([]); },'it accepts arrays');

    var defaultMethod = function () {
        var args = [].slice.call(arguments);
        t.ok(true, 'the default method can be overriden');
        t.equal(args.length, 3, 'it is called with 3 arguments');
        t.equal(args[0], 'zero', 'argument 1 is "zero"');
        t.equal(args[1], 1, 'argument 2 is 1');
        t.deepEqual(args[2], {two: 2}, 'argument 3 is {two:2}');
    };
    gf = defineGeneric('gf3', defaultMethod);
    gf({}, 'zero', 1, {two:2});

    var testFn = defineGeneric('testable');
    var testable = testFn.addMethod({}, function () {});
    t.ok(testFn.isImplemented(testable), 'is implemented');
    t.notOk(testFn.isImplemented({}), 'not implemented');
    t.end();
});
