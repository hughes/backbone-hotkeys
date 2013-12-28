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

    var Hotkeys = {},
        oldKeyDownHandler = document.onkeydown,
        oldKeyUpHandler = document.onkeyup,
        oldKeyPressHandler = document.onkeypress,
        CONST,
        translate;

    CONST = {
        shift: 16,
        ctrl: 17,
        alt: 18
    };

    _.extend(Hotkeys, Backbone.Events);

    translate = function (code) {
        var names = _.keys(CONST),
            codes = _.values(CONST),
            index = codes.indexOf(code);

        if (index > -1) {
            // this key has a special name
            return names[index];
        } else {
            // this key can just be converted to a string
            return String.fromCharCode(code).toLocaleLowerCase();
        }
    };

    Hotkeys.keyDownHandler = function (e) {
        var key = translate(e.keyCode || e.which),
            result = [];

        // modifier keys
        if (e.ctrlKey) {
            result.push('ctrl');
        }
        if (e.altKey) {
            result.push('alt');
        }
        if (e.shiftKey) {
            result.push('shift');
        }

        result.push(key);

        // remove duplicates (ctrl+ctrl)
        result = _.uniq(result);

        Hotkeys.trigger(result.join('+'));

        if (_.isFunction(oldKeyDownHandler)) {
            oldKeyDownHandler.call(this, e);
        }
        return;
    };

    Hotkeys.keyUpHandler = function (e) {
        if (_.isFunction(oldKeyUpHandler)) {
            oldKeyUpHandler.call(this, e);
        }
        return;
    };

    Hotkeys.keyPressHandler = function (e) {
        if (_.isFunction(oldKeyPressHandler)) {
            oldKeyPressHandler.call(this, e);
        }
        return;
    };

    document.onkeydown = Hotkeys.keyDownHandler;
    document.onkeyup = Hotkeys.keyUpHandler;
    document.onkeypress = Hotkeys.keyPressHandler;

    Backbone.Hotkeys = Hotkeys;

    return Backbone;
}));
