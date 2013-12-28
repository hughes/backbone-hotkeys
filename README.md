# backbone-hotkeys

A plugin for Backbone that extends `Backbone.View` to add more flexible hotkey-like bindings

# Installation

```
npm install backbone-hotkeys
```

# Setup

Include `backbone-hotkeys.js` in your app either by requirejs/AMD or global installation via a `<script>` tag.

If you want to install it to Backbone.View directly:

    _.extend(Backbone.View.prototype, Backbone.Hotkeys.View.prototype);

# Example

```javascript
var MyHotkeyView = Backbone.Hotkeys.View.extend({
    hotkeys: {
        'a': 'a_btn_handler',
        'ctrl+c': 'copy',
        'ctrl+alt+f': function (key) { console.log('pressed', key); }
    },
    a_btn_handler: function (key) { console.log('pressed', key); },
    copy: function () { console.log('copy'); }
});
```

# Limitations

Currently, hotkeys are handled globally (at the `document` level). There is no way to have scoped hotkeys at this time.

Localization is not supported at this time. This assumes you have an English QWERTY layout keyboard.
