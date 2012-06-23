var Neon = require('../neon.js');

console.log(Neon);

console.log('Neon Class     :',typeof Neon.Class);
console.log('Neon Module    :',typeof Neon.Module);
console.log('Neon Interface :',typeof Neon.Interface);

var Class = Neon.Class;
var Module = Neon.Module;
var Interface = Neon.Interface;

console.log('Class          :',typeof Class);
console.log('Module         :',typeof Module);
console.log('Interface      :',typeof Interface);

Module('Composition')({
  y : 5,
  prototype : {
    z : 3
  }
});

Interface('Editable')({
  constructor : ['x'],
  prototype   : ['x']
});

Class('Widget')({
    
});

Class('Overlay').inherits(Widget).ensures(Editable).includes(Composition)({
  html : '<div></div>',
  x : 10,
  prototype : {
    init : function (element){
      if(!element){
        element = document.createElement('div');
        element.innerHTML = 'hola';
        document.body.appendChild(element);
      }
    },
    x : 10,
    b : 5
  }
});