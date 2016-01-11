/*eslint strict:[2,"global"], func-names:0*/

'use strict';

var test = require('tape').test;

var slice = Array.prototype.slice;


test('define-generic', function (t) {
    var create = require('./');

    var a = 'A';
    var b = 'B';
    var d = '*';

    var aRet = 'A method';
    var bRet = 'B method';
    var dRet = 'DEAFAULT method';

    var spec1 = {};
    var spec2 = {};

    var methods = {};
    var generic1, generic2;

    function getMethod(methodTab, args) {
        var key = args[0];
        return methodTab[key];
    }

    function defaultMethod() { return dRet; }

    methods[a] = function () { return aRet; };
    methods[b] = function () { return slice.call(arguments).concat(bRet); };


    t.throws(function () { create({}, methods); }, TypeError, 'Throws if missing spec.getMethod');


    spec1.getMethod = getMethod;
    generic1 = create(spec1, methods);
    t.is(generic1(a), aRet, 'applies A method');
    t.same(generic1(b, 1, '2'), [ b, 1, '2', bRet ], 'applies B method with arguments');
    t.throws(function () { generic1(d); }, ReferenceError, 'applies DEAFAULT method: throw error');


    spec2.getMethod = getMethod;
    spec2.defaultMethod = defaultMethod;
    generic2 = create(spec2, methods);
    t.is(generic2(d), dRet, 'applies DEAFAULT method');

    t.end();
});

    t.end();
});
