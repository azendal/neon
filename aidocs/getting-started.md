# Getting Started with Neon.js

This guide will walk you through the process of setting up a project with Neon.js and creating your first class.

## Installation

Neon.js is available as an npm package. To install it, run the following command in your project's directory:

```bash
npm install neon-js
```

(Note: at the time of writing, the package is not yet published to npm, so you would need to install it from a local path or a git repository). For the purpose of this documentation, we'll assume it's on npm.

## Your First Class

Once you have Neon.js installed, you can start using it to create classes. Here's a simple example of a `Person` class:

```javascript
// main.js
const Neon = require('neon-js');

const Person = Neon.Class('Person')({
  prototype: {
    init: function (name) {
      this.name = name;
    },
    sayHello: function () {
      console.log(`Hello, my name is ${this.name}`);
    }
  }
});

const person = new Person('Alice');
person.sayHello(); // Output: Hello, my name is Alice
```

In this example, we're using `Neon.Class` to create a new class called `Person`. The `prototype` property of the class definition contains the methods that will be available on instances of the class. The `init` method is a special method that acts as the constructor for the class.

## Inheritance

Neon.js makes it easy to create classes that inherit from other classes. Here's an example of a `Student` class that inherits from the `Person` class:

```javascript
// main.js
const Neon = require('neon-js');

// ... (Person class from above)

const Student = Neon.Class('Student').inherits(Person)({
  prototype: {
    init: function (name, major) {
      this.constructor.superClass.prototype.init.call(this, name);
      this.major = major;
    },
    study: function () {
      console.log(`I am studying ${this.major}`);
    }
  }
});

const student = new Student('Bob', 'Computer Science');
student.sayHello(); // Output: Hello, my name is Bob
student.study();    // Output: I am studying Computer Science
```

In this example, we're using the `inherits` method to specify that the `Student` class should inherit from the `Person` class. We're also calling the parent class's `init` method using `this.constructor.superClass.prototype.init.call(this, name)`.

## Next Steps

Now that you have a basic understanding of how to use Neon.js, you can explore the rest of the documentation to learn about more advanced features like [modules](./api/module.md) and [interfaces](./api/interface.md).
