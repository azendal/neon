# Neon.Module

The `Neon.Module` function allows you to create reusable modules of code that can be mixed into any class. This is a powerful way to achieve code reuse and composition.

## Basic Usage

To create a module, you call `Neon.Module` with the name of the module as a string. This returns a factory function that you can then call with a module definition object.

```javascript
const MyModule = Neon.Module('MyModule')({
  // Properties and methods to be mixed into the class's static side
  myStaticMethod: function () {
    console.log('myStaticMethod called');
  },

  prototype: {
    // Properties and methods to be mixed into the class's prototype
    myMethod: function () {
      console.log('myMethod called');
    }
  }
});
```

## Including a Module

To include a module in a class, you use the `includes` method on the class factory.

```javascript
const MyClass = Neon.Class('MyClass').includes(MyModule)({});

MyClass.myStaticMethod(); // Output: myStaticMethod called

const instance = new MyClass();
instance.myMethod(); // Output: myMethod called
```

You can include multiple modules by passing them as separate arguments to the `includes` method.

```javascript
const AnotherModule = Neon.Module('AnotherModule')({
  prototype: {
    anotherMethod: function () {
      console.log('anotherMethod called');
    }
  }
});

const MyClass = Neon.Class('MyClass').includes(MyModule, AnotherModule)({});

const instance = new MyClass();
instance.myMethod();      // Output: myMethod called
instance.anotherMethod(); // Output: anotherMethod called
```

If multiple modules define a property with the same name, the property from the last module included will be used.
