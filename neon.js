const Neon = {
  classes: {},
  modules: {},
  interfaces: {},
};

const Interface = function Interface(name) {
    var interfaceName, factory;
    interfaceName = name || 'interface' + Math.random().toString();
    factory = function(definition) {
        definition.isInterface = true;
        definition.name = interfaceName;
        if (name) {
            Neon.interfaces[interfaceName] = definition;
        }
        return definition;
    };
    return factory;
};

const Module = function Module(name) {
    var moduleName, factory, newModule;

    moduleName = name || 'module' + Math.random().toString();

    newModule = {
        moduleName : moduleName,
         prototype : {},
         __includedModules : [],
         include : function(module) {
             var property;
             for (property in module) {
                 if (module.hasOwnProperty(property)
                         && property !== 'prototype'
                         && property !== 'isModule'
                         && property !== '__includedModules'
                         && property !== 'include'
                         && property !== 'moduleName') {
                     newModule[property] = module[property];
                 }
             }

             if (module.hasOwnProperty('prototype') && module.prototype) {
                 for (property in module.prototype) {
                     if (module.prototype.hasOwnProperty(property)) {
                         newModule.prototype[property] = module.prototype[property];
                     }
                 }
             }
             else {
                module.prototype = {};
             }

             this.__includedModules.push(module);

             return this;
         }
    };
    
    factory = function(definition){
        var property;
        
        newModule.isModule = true;
        
        for (property in definition) {
            if (definition.hasOwnProperty(property)
                && property !== 'prototype'
                && property !== 'isModule'
                && property !== '__includedModules'
                && property !== 'include'
                && property !== 'moduleName') {
                newModule[property] = definition[property];
            }
        }
        
        if (definition.hasOwnProperty('prototype') && definition.prototype) {
            for (property in definition.prototype) {
                if (definition.prototype.hasOwnProperty(property)) {
                    newModule.prototype[property] = definition.prototype[property];
                }
            }
        }
        
        if (name) {
            Neon.modules[moduleName] = newModule;
        }
        return newModule;
    };
    
    factory.includes = function () {
        for(var i = 0; i < arguments.length; i++){
            newModule.include(arguments[i]);
        }
        return factory;
    };
    
    return factory;
};

const Class = (className) => {
  let superClass = class {};
  const modules = [];
  const interfaces = [];

  const factory = (classDefinition) => {
    // 1. Create the class with the correct superclass
    const NewClass = class extends superClass {
      constructor(...args) {
        super(...args);
        if (this.init) {
          this.init(...args);
        }
      }
    };

    // 2. Copy static properties from superclass
    if (superClass !== Object) {
        for (const i in superClass) {
            if (superClass.hasOwnProperty(i)
                && i != 'prototype'
                && i !== 'className'
                && i !== 'superClass'
                && i !== 'include'
                && i != '__descendants') {
                NewClass[i] = superClass[i];
            }
        }
    }


    Object.defineProperty(NewClass, 'name', { value: className });
    NewClass.className = className;
    NewClass.__descendants = [];
    NewClass.__implementedInterfaces = interfaces;
    NewClass.__includedModules = []; // will be populated by includeModule

    // 3. Implement include
    const includeModule = (target, module) => {
        for (const property in module) {
            if (module.hasOwnProperty(property)
                && property !== 'prototype'
                && property !== 'isModule'
                && property !== '__includedModules'
                && property !== 'include'
                && property !== 'moduleName') {
                target[property] = module[property];
            }
        }

        if (module.hasOwnProperty('prototype') && module.prototype) {
            for (const property in module.prototype) {
                if (module.prototype.hasOwnProperty(property)) {
                    target.prototype[property] = module.prototype[property];
                }
            }
        }
        target.__includedModules.push(module);
    };

    NewClass.include = (module) => {
        includeModule(NewClass, module);
    };

    // 4. includes
    modules.forEach((module) => {
      includeModule(NewClass, module);
    });

    // 5. classDefinition
    if (classDefinition) {
      if (classDefinition.prototype) {
        Object.assign(NewClass.prototype, classDefinition.prototype);
        delete classDefinition.prototype;
      }
      Object.assign(NewClass, classDefinition);
    }

    // 6. ensures
    interfaces.forEach((iface) => {
      if (iface.constructor) {
        iface.constructor.forEach((prop) => {
            if(!(prop in NewClass)) {
                console.log(`must implement static ${iface.name}`);
            }
        });
      }
      if(iface.prototype) {
          iface.prototype.forEach((prop) => {
              if(!(prop in NewClass.prototype)) {
                  console.log(`must implement prototype ${iface.name}`);
              }
          });
      }
    });

    if (superClass && superClass.hasOwnProperty('__descendants')) {
        superClass.__descendants.push(NewClass);
    }

    if (className) {
        Neon.classes[className] = NewClass;
    }
    return NewClass;
  };

  factory.inherits = (s) => {
    superClass = s;
    return factory;
  };

  factory.includes = (...m) => {
    modules.push(...m);
    return factory;
  };

  factory.ensures = (...i) => {
    interfaces.push(...i);
    return factory;
  };

  return factory;
};

Neon.Interface = Interface;
Neon.Module = Module;
Neon.Class = Class;

module.exports = Neon;
