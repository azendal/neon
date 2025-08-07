# Neon.Class

The `Neon.Class` function is the cornerstone of Neon.js. It provides a simple and expressive way to create classes with support for inheritance, modules, and interfaces.

## Basic Usage

To create a class, you call `Neon.Class` with the name of the class as a string. This returns a factory function that you can then call with a class definition object.

```javascript
const MyClass = Neon.Class('MyClass')({
  // Static properties
  MY_CONSTANT: 42,

  prototype: {
    // Instance properties and methods
    init: function () {
      console.log('MyClass instance created');
    }
  }
});
```

## Inheritance

You can use the `inherits` method to create a class that inherits from another class.

```javascript
const BaseClass = Neon.Class('BaseClass')({
  prototype: {
    greet: function () {
      console.log('Hello from BaseClass');
    }
  }
});

const MyClass = Neon.Class('MyClass').inherits(BaseClass)({
  prototype: {
    init: function () {
      console.log('MyClass instance created');
    }
  }
});

const instance = new MyClass();
instance.greet(); // Output: Hello from BaseClass
```

## Including Modules

You can use the `includes` method to mix in functionality from one or more modules.

```javascript
const MyModule = Neon.Module('MyModule')({
  prototype: {
    myMethod: function () {
      console.log('myMethod called');
    }
  }
});

const MyClass = Neon.Class('MyClass').includes(MyModule)({});

const instance = new MyClass();
instance.myMethod(); // Output: myMethod called
```

## Ensuring Interfaces

You can use the `ensures` method to specify that a class must implement one or more interfaces.

```javascript
const MyInterface = Neon.Interface('MyInterface')({
  prototype: ['myMethod']
});

const MyClass = Neon.Class('MyClass').ensures(MyInterface)({
  prototype: {
    myMethod: function () {
      console.log('myMethod implemented');
    }
  }
});
```

If the class fails to implement any of the methods defined in the interface, a warning will be logged to the console.
