var Neon = require('./neon.js');

console.log('Neon Class     :',typeof Neon.Class);
console.log('Neon Module    :',typeof Neon.Module);
console.log('Neon Interface :',typeof Neon.Interface);

var Class = Neon.Class;
var Module = Neon.Module;
var Interface = Neon.Interface;

console.log('Neon Class     :',typeof Class);
console.log('Module         :',typeof Module);
console.log('Interface      :',typeof Interface);