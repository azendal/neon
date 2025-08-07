# BubblingSupport

The `BubblingSupport` module adds event bubbling capabilities to classes that also use `NodeSupport` and `CustomEventSupport`. When an event is dispatched on a node, it will bubble up the node tree, triggering handlers on all the ancestor nodes.

## Usage

To use the `BubblingSupport` module, you first need to import it from the standard library, along with `NodeSupport` and `CustomEventSupport`:

```javascript
const { NodeSupport, CustomEventSupport, BubblingSupport } = require('neon-js/stdlib');
```

Then, you can include all three modules in a class:

```javascript
const BubblingTreeNode = Neon.Class('BubblingTreeNode').includes(NodeSupport, CustomEventSupport, BubblingSupport)({
  prototype: {
    init: function (name) {
      this.name = name;
    }
  }
});

const root = new BubblingTreeNode('root');
const child = new BubblingTreeNode('child');
const grandchild = new BubblingTreeNode('grandchild');

root.appendChild(child);
child.appendChild(grandchild);

root.bind('my-event', () => {
  console.log('my-event bubbled up to the root');
});

child.bind('my-event', () => {
  console.log('my-event bubbled up to the child');
});

grandchild.dispatch('my-event');
// Output:
// my-event bubbled up to the child
// my-event bubbled up to the root
```

## How it Works

The `BubblingSupport` module overrides the `dispatch` method from `CustomEventSupport`. After dispatching the event on the current node, it checks if the event's propagation has not been stopped. If it hasn't, it then calls `dispatch` on the parent node, thus causing the event to "bubble up" the tree.
