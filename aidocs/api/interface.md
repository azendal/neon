# Neon.Interface

The `Neon.Interface` function allows you to define contracts that classes must adhere to. This is a useful way to ensure that a class provides a certain set of methods.

## Basic Usage

To create an interface, you call `Neon.Interface` with the name of the interface as a string. This returns a factory function that you can then call with an interface definition object.

The interface definition object can have two properties: `constructor` and `prototype`. Each of these properties should be an array of strings, where each string is the name of a method that the class must implement.

```javascript
const MyInterface = Neon.Interface('MyInterface')({
  constructor: ['myStaticMethod'],
  prototype: ['myMethod']
});
```

## Ensuring an Interface

To ensure that a class implements an interface, you use the `ensures` method on the class factory.

```javascript
const MyClass = Neon.Class('MyClass').ensures(MyInterface)({
  myStaticMethod: function () {
    console.log('myStaticMethod implemented');
  },

  prototype: {
    myMethod: function () {
      console.log('myMethod implemented');
    }
  }
});
```

If the class fails to implement any of the methods defined in the interface, a warning will be logged to the console.

You can ensure multiple interfaces by passing them as separate arguments to the `ensures` method.

```javascript
const AnotherInterface = Neon.Interface('AnotherInterface')({
  prototype: ['anotherMethod']
});

const MyClass = Neon.Class('MyClass').ensures(MyInterface, AnotherInterface)({
  myStaticMethod: function () {
    console.log('myStaticMethod implemented');
  },

  prototype: {
    myMethod: function () {
      console.log('myMethod implemented');
    },
    anotherMethod: function () {
      console.log('anotherMethod implemented');
    }
  }
});
```
