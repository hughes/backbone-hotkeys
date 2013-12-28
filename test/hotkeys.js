$(document).ready(function() {

    module('Backbone.Hotkeys');
    Backbone.Hotkeys.on('all', function (e) { console.log(e); });

    var MyHotkeyView = Backbone.Hotkeys.View.extend({
        hotkeys: {
            'a': 'a_btn_handler',
            'ctrl+c': 'copy',
            'ctrl+alt+f': function (key) { console.log('pressed', key); }
        },
        a_btn_handler: function (key) { console.log('pressed', key); },
        copy: function () { console.log('copy'); }
    });

    var a = new MyHotkeyView();
});
