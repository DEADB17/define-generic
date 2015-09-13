/*eslint strict:[2,"global"], func-names:0, no-nested-ternary:0*/

'use strict';

var test = require('tape').test;
var defineGeneric = require('./');

test('defineGeneric', function (t) {
    var getMethodType, a, b, c;

    var methods = {
        DEFAULT: function () { return 'DEAFAULT method'; },
        A: function () { return 'A method'; },
        B: function () { return 'B method'; }
    };

    function selector(meths, args) {
        return meths[args[0].class] || meths.DEFAULT;
    }

    a = { 'class': 'A' };
    b = { 'class': 'B' };
    c = { 'class': 'C' };
    getMethodType = defineGeneric(methods, selector);

    t.is(getMethodType(a), 'A method');
    t.is(getMethodType(b), 'B method');
    t.is(getMethodType(c), 'DEAFAULT method');

    delete methods.DEFAULT;
    t.throws(getMethodType, TypeError);

    t.is(getMethodType.implements(a), true);
    t.is(getMethodType.implements(b), true);
    t.is(getMethodType.implements(c), false);

    getMethodType.for('C', function () { return 'C method'; });
    t.is(getMethodType.implements(c), true);
    t.is(getMethodType(c), 'C method');

    t.end();
});
