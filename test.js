/*eslint strict:[2,"global"], func-names:0*/

'use strict';

var test = require('tape').test;
var createReadOnlyGeneric = require('./');

var slice = Array.prototype.slice;


test('createReadOnlyGeneric', function (t) {
    var a = 'A';
    var b = 'B';
    var d = '*';

    var aRet = 'A method';
    var bRet = 'B method';
    var dRet = 'DEAFAULT method';

    var spec = {
        getMethod: function (methods, args) {
            var key = args[0];
            return methods[key];
        },

        applyMethod: function (fn, args) {
            return fn.apply(null, args);
        },

        defaultMethod: function () { return dRet; }
    };

    var methods = {};

    var genFun;

    methods[a] = function () { return aRet; };
    methods[b] = function () { return slice.call(arguments).concat(bRet); };

    genFun = createReadOnlyGeneric(spec.getMethod, spec.applyMethod, spec.defaultMethod, methods);

    t.is(genFun(a), aRet, 'applies A method');
    t.same(genFun(b, 1, '2'), [ b, 1, '2', bRet ], 'applies B method with arguments');
    t.is(genFun(d), dRet, 'applies DEAFAULT method');

    t.end();
});
