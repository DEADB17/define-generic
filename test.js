'use strict';

var test = require('tape').test;
var dispatchOn = require('./');


test('dispatchOn', function (t) {
    var selector = function (a, b) {
        return a ? 'A' : b ? 'B' : 'C';
    };
    var when = {
        DEFAULT: function () { return 'DEAFAULT method'; },
        A: function () { return 'A method'; },
        B: function () { return 'B method'; }
    };
    var defaults = dispatchOn(selector, when, 'DEFAULT');

    t.is(defaults(true), 'A method');
    t.is(defaults(false, true), 'B method');
    t.is(defaults(false, false), 'DEAFAULT method');
    t.is(defaults(), 'DEAFAULT method');

    delete when.DEFAULT;
    t.throws(defaults, ReferenceError);

    t.end();
});
