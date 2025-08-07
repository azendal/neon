const Neon = require('../neon.js');
const { Class, Module, Interface } = Neon;

describe('Neon', () => {
  const Composition = Module('Composition')({
    moduleClassVariable: 1,
    prototype: {
      moduleInstanceVariable: 2,
    },
  });

  const Contract = Interface('Contract')({
    constructor: ['ensuredClassVariable'],
    prototype: ['ensuredInstanceVariable'],
  });

  const BaseClass = Class('BaseClass')({
    baseClassVariable: 3,
    prototype: {
      baseInstanceVariable: 4,
    },
  });

  const AnonymousModule = Module()({
    anonymousClassVariable: 5,
    prototype: {
      anonymousInstanceVariable: 6,
    },
  });

  const MyClass = Class('MyClass')
    .inherits(BaseClass)
    .ensures(Contract)
    .includes(Composition, AnonymousModule)({
      GREETING: 'HELLO',
      inheritedClassVariable: 7,
      ensuredClassVariable: 8,
      prototype: {
        inheritedInstanceVariable: 9,
        ensuredInstanceVariable: 10,
        init: function (argument) {
          this.greeting = `${this.constructor.GREETING} ${argument}!`;
        },
      },
    });

  const instance = new MyClass('world');

  it('should correctly inherit from the base class', () => {
    expect(MyClass.baseClassVariable).toBe(3);
    expect(instance.baseInstanceVariable).toBe(4);
  });

  it('should correctly include modules', () => {
    expect(MyClass.moduleClassVariable).toBe(1);
    expect(instance.moduleInstanceVariable).toBe(2);
    expect(MyClass.anonymousClassVariable).toBe(5);
    expect(instance.anonymousInstanceVariable).toBe(6);
  });

  it('should correctly define its own properties', () => {
    expect(MyClass.inheritedClassVariable).toBe(7);
    expect(instance.inheritedInstanceVariable).toBe(9);
  });

  it('should correctly ensure interfaces', () => {
    expect(MyClass.ensuredClassVariable).toBe(8);
    expect(instance.ensuredInstanceVariable).toBe(10);
  });

  it('should call the init method on instantiation', () => {
    expect(instance.greeting).toBe('HELLO world!');
  });

  it('should register named entities in the Neon registry', () => {
    expect(Neon.classes.MyClass.className).toBe('MyClass');
    expect(Neon.modules.Composition.moduleName).toBe('Composition');
    expect(Neon.interfaces.Contract.name).toBe('Contract');
  });

  it('should not register anonymous entities in the Neon registry', () => {
    const isAnonymousModuleRegistered = Object.values(Neon.modules).some(
      (mod) => mod === AnonymousModule
    );
    expect(isAnonymousModuleRegistered).toBe(false);
  });
});
