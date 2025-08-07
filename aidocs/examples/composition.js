const Neon = require('../../neon');

const Greeter = Neon.Module('Greeter')({
  prototype: {
    greet: function () {
      console.log(`Hello, I am a ${this.constructor.className}`);
    }
  }
});

const Runnable = Neon.Interface('Runnable')({
  prototype: ['run']
});

const MyClass = Neon.Class('MyClass').includes(Greeter).ensures(Runnable)({
  prototype: {
    run: function () {
      console.log('Running...');
    }
  }
});

const instance = new MyClass();
instance.greet();
instance.run();
