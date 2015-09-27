/*eslint strict:[2,"global"], func-names:0, no-nested-ternary:0*/

'use strict';

var test = require('tape').test;
var createGeneric = require('./');

var slice = Array.prototype.slice;


test('createGeneric', function (t) {
    var a = 'A';
    var b = 'B';
    var c = 'C';

    var aRet = 'A method';
    var bRet = 'B method';
    var dRet = 'DEAFAULT method';

    var G = {
        methods: {},
        getMethod: function getMethod(methods, args) {
            var key = args[0];
            return methods[key];
        },
        setMethod: function setMethod(methods, args) {
            var fn = args[0];
            var key = args[1];
            methods[key] = fn;
        },
        applyMethod: function applyMethod(fn, args) {
            return fn.apply(null, slice.call(args, 1));
        },
        defaultMethod: function defaultMethod() { return dRet; }
    };

    var applyGeneric = createGeneric(G.methods, G.getMethod, G.setMethod, G.applyMethod, G.defaultMethod)
        .put(function A() { return aRet; }, a)
        .put(function B() { return bRet; }, b);

    t.is(applyGeneric(a), aRet, 'applies A method');
    t.is(applyGeneric(b), bRet, 'applies B method');
    t.is(applyGeneric(c), dRet, 'applies DEAFAULT method');

    t.end();
});
