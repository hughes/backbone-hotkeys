## Deprecated project

You might be looking for [backbone-hotkeys](https://github.com/rpocklin/backbone-hotkeys).

# backbone-keyboard ![](https://api.travis-ci.org/hughes/backbone-hotkeys.png)

A plugin for Backbone that extends `Backbone.View` to add more flexible hotkey-like bindings

# Installation

n/a

## Developer setup

```
git clone git@github.com:hughes/backbone-keyboard.git
cd backbone-keyboard
npm install
git submodule init
git submodule update
npm test
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
