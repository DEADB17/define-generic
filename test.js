/*eslint-env es6*/
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


test('tagged', function (t) {
    var create = require('./tagged');

    var key1 = 'obj1';
    var key2 = 'obj2';

    var o1 = { '@type': key1 };
    var o2 = { '@type': key2 };
    var od = { '@type': 'none' };

    var methods = {};

    var generic;

    methods[key1] = function (obj) { return [ obj, key1 ]; };
    methods[key2] = function (obj) { return [ obj, key2 ]; };

    generic = create('@type', methods);

    t.same(generic(o1), [ o1, key1 ], 'method with key1 called');
    t.same(generic(o2), [ o2, key2 ], 'method with key2 called');
    t.throws(function () { generic(od); }, ReferenceError);

    t.end();
});


test('constructor', function (t) {
    var create = require('./constructor');

    var generic, table;

    function MyObject() {}

    table = [
        [ Boolean, () => 'Boolean' ],
        [ Function, () => 'Function' ],
        [ Number, () => 'Number' ],
        [ Object, () => 'Object' ],
        [ String, () => 'String' ],
        [ MyObject, () => 'MyObject' ]
    ];

    generic = create(table);

    t.is(generic(true), 'Boolean', 'Boolean');
    t.is(generic(function () {}), 'Function', 'Function');
    t.is(generic(17), 'Number', 'Number');
    t.is(generic(NaN), 'Number', 'Number');
    t.is(generic({}), 'Object', 'Object');
    t.is(generic('Hello'), 'String', 'String');
    t.is(generic(new MyObject()), 'MyObject', 'MyObject');

    t.end();
});
