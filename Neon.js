/**
 * Class DSL
 * This files provides a dsl for the following design patterns:
 * inheritance, interface, module.
 *
 * It also provides a dsl for class creation.
 *
 * The phylosophy is that it should not try to emulate other languages,
 * and it preserves the javascript good parts, but with a nicer syntax to
 * create classes that ensure interfaces and include reusable functionality as modules.
 *
 * Author: Fernando Trasviña
 * Contributors: Ivan "Mexpolk" Torres
 *
 * Usage:
 * Interface('Editable')({
 * 	constructor : ['x'],
 * 	prototype   : ['x']
 * });
 *
 * Module('Composition')({
 * 	y : 5,
 * 	prototype : {
 * 		z : 3
 * 	}
 * });
 *
 * Module('Other')({
 * 	a : 5,
 * 	prototype : {
 * 		b : 3
 * 	}
 * });
 *
 * Class('Overlay').inherits(Widget).ensures(Editable).includes(Composition, Other)({
 * 	html : '<div></div>',
 * 	prototype : {
 * 		initialize : function (element){
 * 			if(!element){
 * 				element = document.createElement('div');
 * 				element.innerHTML = 'hola';
 * 				document.body.appendChild(element);
 * 			}
 * 		},
 * 		b : 5
 * 	}
 * });
 */
var Interface = function Interface(nameOrNameSpace, name){
	var nameSpace                  = (nameOrNameSpace && name) ? nameOrNameSpace : this;
	var interfaceName              = (nameOrNameSpace && name) ? name :
		(nameOrNameSpace) ? nameOrNameSpace : 'interface' + Math.random().toString();
	var factory = function(definition){
		definition.isInterface   = true;
		definition.name          = interfaceName;
		nameSpace[interfaceName] = definition;
		return nameSpace[interfaceName];
	};
	return factory;
};

var Module = function Module(nameOrNameSpace, name){
	var nameSpace                  = (nameOrNameSpace && name) ? nameOrNameSpace : this;
	var interfaceName              = (nameOrNameSpace && name) ? name :
		(nameOrNameSpace) ? nameOrNameSpace : 'module' + Math.random().toString();
	var factory = function(definition){
		definition.isModule      = true;
		nameSpace[interfaceName] = definition;
		return nameSpace[interfaceName];
	};
	return factory;
};

var Class = function Class(classNameOrNameSpace, className){
	var nameSpace                  = (classNameOrNameSpace && className) ? classNameOrNameSpace : this;
	var className                  = (classNameOrNameSpace && className) ? className :
		(classNameOrNameSpace) ? classNameOrNameSpace : 'class' + Math.random().toString();

	var newClass                   = function(){
		if(this.initialize){
			this.initialize.apply(this, arguments);
		}
	};
	newClass.__descendants           = [];
	newClass.__implementedInterfaces = [];
	newClass.__includedModules       = [];
	newClass.name                    = className;
	newClass.include                 = function(module){
	    var property = null;
		for(property in module){
			if(module.hasOwnProperty(property) && property != 'prototype' && property != 'constructor' && property != 'isModule'){
				newClass[property] = module[property];
			}
		}
		for(property in module.prototype){
			if(module.prototype.hasOwnProperty(property)){
				newClass.prototype[property] = module.prototype[property];
			}
		}
		newClass.__includedModules.push(module);
		return this;
	};

	var classFactory = function(classDefinition){
		var classPrototype = classDefinition.prototype;
		if(classPrototype){
			for(var property in classPrototype){
				if(classPrototype.hasOwnProperty(property)){
					newClass.prototype[property] = classPrototype[property];
				}
			}
			delete classDefinition.prototype;
		}
		for(var property in classDefinition){
			if(classDefinition.hasOwnProperty(property)){
				newClass[property] = classDefinition[property];
			}
		}

		for(var i = 0, il = newClass.__implementedInterfaces.length; i < il; i++){
			for(var j = 0, jl = newClass.__implementedInterfaces[i].constructor.length; j < jl; j++){
				if(!newClass[ newClass.__implementedInterfaces[i].constructor[j] ]){
					alert('must implement static ' + newClass.__implementedInterfaces[i].name);
					break;
				}
			}

			for(var j = 0, jl = newClass.__implementedInterfaces[i].prototype.length; j < jl; j++){
				if(!newClass.prototype[newClass.__implementedInterfaces[i].prototype[j]]){
					alert('must implement prototype ' + newClass.__implementedInterfaces[i].name);
					break;
				}
			}
		}

		nameSpace[className] = newClass;
		return newClass;
	};

	classFactory.inherits = function(superClass){
		newClass.superClass            = superClass;
		var inheritedClass             = function(){};
		inheritedClass.prototype       = superClass.prototype;
		newClass.prototype             = new inheritedClass();
		newClass.prototype.constructor = newClass;

		for(var i in superClass){
			if(superClass.hasOwnProperty(i) && i != 'prototype' && i !== 'name'){
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
