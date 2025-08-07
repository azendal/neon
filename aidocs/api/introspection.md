# Introspection

Neon.js provides a central registry of all named classes, modules, and interfaces, which makes it easy to introspect the system. This is useful for debugging, testing, and building tools on top of Neon.js.

## The Neon Object

The main `Neon` object that you `require` from the `neon-js` package serves as the central point for introspection. It has three properties that hold the registered entities:

- `Neon.classes`: An object containing all the named classes created with `Neon.Class`.
- `Neon.modules`: An object containing all the named modules created with `Neon.Module`.
- `Neon.interfaces`: An object containing all the named interfaces created with `Neon.Interface`.

## Usage Example

Here's an example of how you can use the introspection API to get a list of all the registered classes:

```javascript
const Neon = require('neon-js');

Neon.Class('MyClass')({});
Neon.Class('AnotherClass')({});

console.log(Object.keys(Neon.classes)); // Output: ['MyClass', 'AnotherClass']
```

Similarly, you can get a list of all the registered modules and interfaces:

```javascript
Neon.Module('MyModule')({});
Neon.Interface('MyInterface')({});

console.log(Object.keys(Neon.modules));    // Output: ['MyModule']
console.log(Object.keys(Neon.interfaces)); // Output: ['MyInterface']
```

## Anonymous Entities

Anonymous classes, modules, and interfaces (i.e., those created without a name) are not added to the registries.

```javascript
Neon.Class()({}); // Anonymous class

console.log(Object.keys(Neon.classes)); // Still ['MyClass', 'AnotherClass']
```
