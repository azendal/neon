# CustomEventSupport

The `CustomEventSupport` module provides a set of methods for adding custom event handling to any class. Any class that includes this module will get methods like `bind`, `unbind`, and `dispatch`.

## Usage

To use the `CustomEventSupport` module, you first need to import it from the standard library:

```javascript
const { CustomEventSupport } = require('neon-js/stdlib');
```

Then, you can include it in any class:

```javascript
const EventfulClass = Neon.Class('EventfulClass').includes(CustomEventSupport)({});

const instance = new EventfulClass();

instance.bind('my-event', (event) => {
  console.log('my-event was fired with data:', event.data);
});

instance.dispatch('my-event', { message: 'Hello, world!' });
// Output: my-event was fired with data: { message: 'Hello, world!' }
```

## API

### `bind(eventType, handler)`

Binds an event handler to a specific event type.

### `unbind(eventType, handler)`

Unbinds an event handler from a specific event type. If no handler is provided, all handlers for the given event type will be removed.

### `dispatch(eventType, data)`

Dispatches an event of a specific type. You can optionally pass a data object that will be available on the `data` property of the event object passed to the handlers.
