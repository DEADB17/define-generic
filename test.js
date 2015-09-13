/*eslint strict:[2,"global"], func-names:0, no-nested-ternary:0*/

'use strict';

var test = require('tape').test;
var dispatchOn = require('./');

test('dispatchOn', function (t) {
    var when, defaults;

    function selector(a, b) {
        return a ? 'A' : b ? 'B' : 'C';
    }

    when = {
        DEFAULT: function () { return 'DEAFAULT method'; },
        A: function () { return 'A method'; },
        B: function () { return 'B method'; }
    };

    defaults = dispatchOn('DEFAULT', selector, when);

    t.is(defaults(true), 'A method');
    t.is(defaults(false, true), 'B method');
    t.is(defaults(false, false), 'DEAFAULT method');
    t.is(defaults(), 'DEAFAULT method');

    delete when.DEFAULT;
    t.throws(defaults, ReferenceError);

    t.end();
});
