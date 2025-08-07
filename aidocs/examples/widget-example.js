const Neon = require('../../neon');
const { Widget } = require('../../stdlib');

// Mocking a browser environment
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
global.document = window.document;
const $ = require('jquery')(window);


const MyWidget = Neon.Class('MyWidget').inherits(Widget)({
  HTML: '<div><p>Hello, world!</p><button>Click me</button></div>',
  ELEMENT_CLASS: 'my-widget',

  prototype: {
    init: function (config) {
      this.constructor.superClass.prototype.init.call(this, config);
      this.element.find('button').on('click', () => {
        this.dispatch('my-widget-clicked');
      });
    }
  }
});

const widget = new MyWidget();

widget.bind('my-widget-clicked', () => {
  console.log('My widget was clicked!');
});

widget.render($(document.body));

// Simulate a click
widget.element.find('button').trigger('click');
