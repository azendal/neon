if(typeof require !== 'undefined') { // We are in Node, need to require the file

    console.log("Requiring neon from file");
    require('neon');
    // In Coffeescript, the following construct is recommended
    // { Class, Module, Interface } = require('neon')
}


console.log('Class          :', typeof Class);
console.log('Module         :', typeof Module);
console.log('Interface      :', typeof Interface);

Module('Composition')({
    moduleClassVariable : 1,
    prototype : {
        moduleInstanceVariable : 2
    }
});

Interface('Contract')({
    constructor : ['ensuredClassVariable'],
    prototype   : ['ensuredInstanceVariable']
});

Class('BaseClass')({
    baseClassVariable : 3,
    prototype : {
        baseInstanceVariable : 4
    }
});

var AnonymousModule = Module()({
    anonymousClassVariable : 5,
    prototype : {
        anonymousInstanceVariable : 6
    }
});

Class('MyClass').inherits(BaseClass).ensures(Contract).includes(Composition, AnonymousModule)({
    GREETING : 'HELLO',
    inheritedClassVariable : 7,
    ensuredClassVariable : 8,
    prototype : {
        inheritedInstanceVariable : 9,
        ensuredInstanceVariable : 10,
        init : function(argument) {
            console.log(this.constructor.GREETING + ' ' + argument + '!');
        }
    }
});

var instance = new MyClass('world');
console.log(MyClass.moduleClassVariable);
console.log(instance.moduleInstanceVariable);
console.log(MyClass.baseClassVariable);
console.log(instance.baseInstanceVariable);
console.log(MyClass.anonymousClassVariable);
console.log(instance.anonymousInstanceVariable);
console.log(MyClass.inheritedClassVariable);
console.log(MyClass.ensuredClassVariable);
console.log(instance.inheritedInstanceVariable);
console.log(instance.ensuredInstanceVariable);

