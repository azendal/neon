const Neon = require('../../neon');

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
person.sayHello();
