/**
 *
 * backbone-hotkeys v0.0.0
 *
 * Copyright (c) 2013 Matt Hughes
 *
 * https://github.com/hughes/backbone-hotkeys
 * Licensed under the MIT License
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['underscore', 'backbone'], factory);
    } else {
        // globals
        factory(_, Backbone);
    }
}(function (_, Backbone) {
    'use strict';

    var Hotkeys = {};
    _.extend(Hotkeys, Backbone.Events);

    Hotkeys.keyPressHandler = function (e) {
        var pressed_char = String.fromCharCode(e.keyCode || e.charCode);
        console.log(pressed_char);
    };

    Backbone.Hotkeys = Hotkeys;
    document.onkeypress = Hotkeys.keyPressHandler;

    return Backbone;
}));
