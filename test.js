/*eslint strict:[2,"global"], func-names:0, no-nested-ternary:0*/

'use strict';

var test = require('tape').test;
var dispatchOn = require('./');

test('dispatchOn', function (t) {
    var defaults;

    var methods = {
        DEFAULT: function () { return 'DEAFAULT method'; },
        A: function () { return 'A method'; },
        B: function () { return 'B method'; }
    };

    function selector(meths, args) {
        return args[0] ? meths.A : args[1] ? meths.B : meths.DEFAULT;
    }

    defaults = dispatchOn(methods, selector);

    t.is(defaults(true), 'A method');
    t.is(defaults(false, true), 'B method');
    t.is(defaults(false, false), 'DEAFAULT method');
    t.is(defaults(), 'DEAFAULT method');

    delete methods.DEFAULT;
    t.throws(defaults, TypeError);

    t.end();
});
