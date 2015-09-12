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
    function error(key, getKey, methods, defaultKey, onError) {
        t.is(getKey, selector);
        t.is(methods, when);
        t.is(defaultKey, 'DEFAULT');
        t.is(onError, error);
        return 'on error called';
    }
    var defaults = dispatchOn(selector, when, 'DEFAULT', error);

    t.is(defaults(true), 'A method');
    t.is(defaults(false, true), 'B method');
    t.is(defaults(false, false), 'DEAFAULT method');
    t.is(defaults(), 'DEAFAULT method');

    delete when.DEFAULT;
    t.is(defaults(), 'on error called');

    t.end();
});
