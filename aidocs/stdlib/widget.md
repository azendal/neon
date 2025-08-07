# Widget

The `Widget` class is a base class for creating UI widgets. It includes the `NodeSupport` and `CustomEventSupport` modules, so all widgets have parent-child relationships and support for custom events. The `Widget` class also has a dependency on jQuery for DOM manipulation.

## Usage

To use the `Widget` class, you first need to import it from the standard library:

```javascript
const { Widget } = require('neon-js/stdlib');
```

Then, you can create your own widget classes by inheriting from `Widget`:

```javascript
const MyWidget = Neon.Class('MyWidget').inherits(Widget)({
  HTML: '<div><p>Hello, world!</p></div>',
  ELEMENT_CLASS: 'my-widget',

  prototype: {
    init: function (config) {
      this.constructor.superClass.prototype.init.call(this, config);
      this.element.on('click', () => {
        this.dispatch('my-widget-clicked');
      });
    }
  }
});

const widget = new MyWidget();

widget.bind('my-widget-clicked', () => {
  console.log('My widget was clicked!');
});

widget.render(document.body);
```

## API

### `HTML` (static)

A string of HTML that defines the widget's element.

### `ELEMENT_CLASS` (static)

A string that will be added as a CSS class to the widget's element.

### `element`

A jQuery object that represents the widget's DOM element.

### `render(element, beforeElement)`

Renders the widget into the DOM. The `element` argument is a jQuery object that the widget will be appended to. The optional `beforeElement` argument is a jQuery object that the widget will be inserted before.

### `activate()` / `deactivate()`

Activates or deactivates the widget, adding or removing the `active` CSS class.

### `enable()` / `disable()`

Enables or disables the widget, adding or removing the `disable` CSS class.

### `destroy()`

Removes the widget from the DOM and cleans up all its event listeners and child widgets.
