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
student.sayHello();
student.study();
