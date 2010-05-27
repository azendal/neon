var Interface = function Interface(nameOrNameSpace, name){
	var nameSpace, interfaceName, factory;
	nameSpace                  = (nameOrNameSpace && name) ? nameOrNameSpace : this;
	interfaceName              = (nameOrNameSpace && name) ? name :
	(nameOrNameSpace) ? nameOrNameSpace : 'interface' + Math.random().toString();
	factory = function(definition){
		definition.isInterface   = true;
		definition.name          = interfaceName;
		nameSpace[interfaceName] = definition;
		return nameSpace[interfaceName];
	};
	return factory;
};

var Module = function Module(nameOrNameSpace, name){
	var nameSpace, moduleName, factory;
	nameSpace               = (nameOrNameSpace && name) ? nameOrNameSpace : this;
	moduleName              = (nameOrNameSpace && name) ? name :
	(nameOrNameSpace) ? nameOrNameSpace : 'module' + Math.random().toString();
	factory = function(definition){
		definition.isModule      = true;
		nameSpace[moduleName] = definition;
		return nameSpace[moduleName];
	};
	return factory;
};

var Class = function Class(classNameOrNameSpace, className){
	var nameSpace, newClass, classFactory;
	nameSpace                  = (classNameOrNameSpace && className) ? classNameOrNameSpace : this;
	className                  = (classNameOrNameSpace && className) ? className :
	(classNameOrNameSpace) ? classNameOrNameSpace : 'class' + Math.random().toString();

	newClass                   = function(){
		if(this.initializer){
			this.initializer.apply(this, arguments);
		}
	};

	newClass.__descendants           = [];
	newClass.__implementedInterfaces = [];
	newClass.__includedModules       = [];
	newClass.className               = className;
	newClass.include                 = function(module){
		var property;
		for(property in module){
			if(module.hasOwnProperty(property) && property != 'prototype' && property != 'constructor' && property != 'isModule' && property != 'superClass'){
				newClass[property] = module[property];
			}
		}

		if(module.hasOwnProperty('prototype') && module.prototype){
			for(property in module.prototype){
				if(module.prototype.hasOwnProperty(property)){
					newClass.prototype[property] = module.prototype[property];
				}
			}
		}else{
			module.prototype = {};
		}

		newClass.__includedModules.push(module);
		return this;
	};

	classFactory = function(classDefinition){
		var i, il, j, jl, property, classPrototype = classDefinition.prototype;
		if(classPrototype){
			for(property in classPrototype){
				if(classPrototype.hasOwnProperty(property)){
					newClass.prototype[property] = classPrototype[property];
				}
			}
			delete classDefinition.prototype;
		}
		for(property in classDefinition){
			if(classDefinition.hasOwnProperty(property)){
				newClass[property] = classDefinition[property];
			}
		}

		for(i = 0, il = newClass.__implementedInterfaces.length; i < il; i++){
			for(j = 0, jl = newClass.__implementedInterfaces[i].constructor.length; j < jl; j++){
				if(!newClass[ newClass.__implementedInterfaces[i].constructor[j] ]){
					alert('must implement static ' + newClass.__implementedInterfaces[i].name);
					break;
				}
			}

			if(newClass.__implementedInterfaces[i].hasOwnProperty('prototype') && newClass.__implementedInterfaces[i].prototype){
				for(j = 0, jl = newClass.__implementedInterfaces[i].prototype.length; j < jl; j++){
					if(!newClass.prototype[newClass.__implementedInterfaces[i].prototype[j]]){
						alert('must implement prototype ' + newClass.__implementedInterfaces[i].name);
						break;
					}
				}
			}
		}

		nameSpace[className] = newClass;
		return newClass;
	};

	classFactory.inherits = function(superClass){
		var i, inheritedClass;
		newClass.superClass            = superClass;
		superClass.__descendants.push(newClass);
		inheritedClass                 = function(){};
		inheritedClass.prototype       = superClass.prototype;
		newClass.prototype             = new inheritedClass();
		newClass.prototype.constructor = newClass;

		for(i in superClass){
			if(superClass.hasOwnProperty(i) && i != 'prototype' && i !== 'className' && i !== 'superClass' && i != '__descendants'){
				newClass[i] = superClass[i];
			}
		}

		delete this.inherits;
		return this;
	};

	classFactory.ensures = function(interfaces){
		for(var i = 0; i < arguments.length; i++){
			newClass.__implementedInterfaces.push(arguments[i]);
		}
		delete this.ensures;
		return classFactory;
	};

	classFactory.includes = function(){
		for(var i = 0; i < arguments.length; i++){
			newClass.include(arguments[i]);
		}
		return classFactory;
	};

	return classFactory;
};
