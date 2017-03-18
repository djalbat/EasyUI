'use strict';

const eventMixin = require('./mixin/event'),
      clickMixin = require('./mixin/click'),
      mouseMixin = require('./mixin/mouse');

class Window {
  constructor() {
    this.domElement = window;

    this.handlersMap = {};
  }
  
  getWidth() { return this.domElement.innerWidth; } ///
  
  getHeight() { return this.domElement.innerHeight; } ///

  getPageXOffset() { return this.domElement.pageXOffset; }

  getPageYOffset() { return this.domElement.pageYOffset; }
  
  onResize(handler) {
    const type = 'resize',
          addEventListener = this.addHandler(type, handler);

    if (addEventListener) {
      this.domElement.addEventListener(type, eventListener.bind(this));
    }
  }

  offResize(handler) {
    const type = 'resize',
          removeEventListener = this.removeHandler(type, handler);

    if (removeEventListener) {
      this.domElement.removeEventListener(type, eventListener.bind(this));
    }
  }
}

Object.assign(Window.prototype, eventMixin);
Object.assign(Window.prototype, clickMixin);
Object.assign(Window.prototype, mouseMixin);

module.exports = new Window();  ///

function eventListener(event) {
  const type = event.type,
        handlers = this.handlersMap[type],
        width = this.getWidth(),
        height = this.getHeight();

  handlers.forEach(function(handler) {
    handler(width, height);
  });
}
