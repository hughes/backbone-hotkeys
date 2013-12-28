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
        oldDelegateEvents = Backbone.View.prototype.delegateEvents,
        oldUndelegateEvents = Backbone.View.prototype.undelegateEvents;

    _.extend(Hotkeys, Backbone.Events);

    Hotkeys.CONST = {
        shift: 16,
        ctrl: 17,
        alt: 18,
        left: 37,
        up: 38,
        right: 39,
        down: 40
    };

    Hotkeys.translate = function (code) {
        var names = _.keys(Hotkeys.CONST),
            codes = _.values(Hotkeys.CONST),
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
        var key = Hotkeys.translate(e.keyCode || e.which),
            result = [],
            event;

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

        event = result.join('+');
        Hotkeys.trigger(event, [event]);

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

    // Backbone.View modifications
    Hotkeys.View = Backbone.View.extend({
        delegateEvents: function () {
            var hotkeys = this.hotkeys || _.result(this, 'hotkeys'),
                result = oldDelegateEvents.apply(this, arguments);
            if (hotkeys) {
                _.each(hotkeys, function (method, event) {
                    if (!_.isFunction(method)) {
                        method = this[method];
                    }
                    this.listenTo(Backbone.Hotkeys, event, method, this);
                }.bind(this));
            }
            return result;
        },
        undelegateEvents: function () {
            this.stopListening(Backbone.Hotkeys);
            return oldUndelegateEvents.apply(this, arguments);
        }
    });

    // final initialization
    document.onkeydown = Hotkeys.keyDownHandler;
    document.onkeyup = Hotkeys.keyUpHandler;
    document.onkeypress = Hotkeys.keyPressHandler;

    Backbone.Hotkeys = Hotkeys;

    return Backbone;
}));
