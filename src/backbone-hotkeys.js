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
        define(['jquery', 'underscore', 'backbone'], factory);
    } else {
        // globals
        factory(jQuery, _, Backbone);
    }
}(function (jQuery, _, Backbone) {
    'use strict';

    var Hotkeys = {};
    _.extend(Hotkeys, Backbone.Events);

    Hotkeys.keyPressHandler = function (e) {
        var char = String.fromCharCode(e.keyCode || e.charCode);
        console.log(char);
    };

    Backbone.Hotkeys = Hotkeys;
    jquery(document).on('keypress', Hotkeys.keyPressHandler);

    return Backbone;
}));
