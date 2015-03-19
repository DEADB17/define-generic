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
        t.pass('the default method can be overriden');
        t.is(args.length, 4, 'it is called with 4 arguments');
        t.same(args[0], {}, 'argument 1 is {}');
        t.is(args[1], 'two', 'argument 2 is "two"');
        t.is(args[2], 3, 'argument 3 is 3');
        t.same(args[3], {four: 4}, 'argument 4 is {four:4}');
    };
    gf = defineGeneric('gf3', defaultMethod);
    gf({}, 'two', 3, {four:4});

    var testFn = defineGeneric('testable');
    var testable = testFn.addMethod({}, function () {});
    t.ok(testFn.isImplemented(testable), 'is implemented');
    t.notOk(testFn.isImplemented({}), 'not implemented');
    t.end();
});
