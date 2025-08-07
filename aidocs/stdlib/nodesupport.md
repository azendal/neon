# NodeSupport

The `NodeSupport` module provides a set of methods for creating tree-like structures with parent-child relationships. Any class that includes this module will get methods like `appendChild`, `removeChild`, and `setParent`.

## Usage

To use the `NodeSupport` module, you first need to import it from the standard library:

```javascript
const { NodeSupport } = require('neon-js/stdlib');
```

Then, you can include it in any class:

```javascript
const TreeNode = Neon.Class('TreeNode').includes(NodeSupport)({
  prototype: {
    init: function (name) {
      this.name = name;
    }
  }
});

const root = new TreeNode('root');
const child1 = new TreeNode('child1');
const child2 = new TreeNode('child2');

root.appendChild(child1);
root.appendChild(child2);

console.log(root.children.length); // Output: 2
console.log(child1.parent.name);   // Output: root
```

## API

### `appendChild(child)`

Appends a child node to the current node.

### `removeChild(child)`

Removes a child node from the current node.

### `insertBefore(child, beforeChild)`

Inserts a child node before another child node.

### `setParent(parent)`

Sets the parent of the current node. Note that this method does not add the current node to the parent's `children` array. It is generally recommended to use `appendChild` on the parent node instead.

### `getDescendants()`

Returns an array of all the descendants of the current node.

### `getPreviousSibling()`

Returns the previous sibling of the current node.

### `getNextSibling()`

Returns the next sibling of the current node.
