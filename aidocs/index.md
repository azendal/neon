# Neon.js

Neon.js is a lightweight JavaScript library that provides a Domain-Specific Language (DSL) for classical inheritance, modules, and interfaces. It is designed to help developers write object-oriented code in a way that is both expressive and easy to understand, especially for those coming from a background in classical object-oriented languages like Ruby or Java.

## Philosophy

The core philosophy of Neon.js is to embrace the good parts of JavaScript while providing a more familiar syntax for object-oriented programming. It does not try to emulate other languages, but rather to provide a thin layer of syntactic sugar on top of JavaScript's prototypal inheritance model. This makes it possible to write code that is both powerful and idiomatic.

## Features

- **Classical Inheritance:** Use `Class('MyClass').inherits(BaseClass)` to create classes that inherit from other classes.
- **Modules:** Use `Module('MyModule')` to create reusable modules of code that can be mixed into any class using `includes(MyModule)`.
- **Interfaces:** Use `Interface('MyInterface')` to define contracts that classes must adhere to, enforced with `ensures(MyInterface)`.
- **Introspection:** All named classes, modules, and interfaces are registered in a central `Neon` object, allowing for easy introspection of the system.
- **Standard Library:** Neon.js comes with a standard library of useful modules, including `NodeSupport` for creating tree-like structures, and `CustomEventSupport` and `BubblingSupport` for event handling.

## Getting Started

To get started with Neon.js, check out the [Getting Started](./getting-started.md) guide.
