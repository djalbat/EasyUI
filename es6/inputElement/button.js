'use strict';

const InputElement = require('../inputElement');

class Button extends InputElement {
  constructor(selector, clickHandler) {
    super(selector);

    if (clickHandler !== undefined) {
      this.onClick(clickHandler);
    }
  }

  clone(clickHandler) { return Button.clone(this, clickHandler); }

  onClick(handler) {
    if (handler.intermediateHandler === undefined) {
      handler.intermediateHandler = defaultIntermediateClickHandler;
    }
    
    super.onClick(handler);
  }

  offClick(handler) {
    super.offClick(handler);
  }

  static clone(element, clickHandler) {
    return InputElement.clone(Button, element, clickHandler);
  }

  static fromHTML(html, clickHandler) {
    return InputElement.fromHTML(Button, html, clickHandler);
  }

  static fromDOMElement(domElement, clickHandler) {
    return InputElement.fromDOMElement(Button, domElement, clickHandler);
  }

  static fromProperties(properties) {
    const { onClick } = properties,
          clickHandler = onClick; ///

    return InputElement.fromProperties(Button, properties, clickHandler);
  }
}

Object.assign(Button, {
  tagName: 'button',
  ignoredProperties: [
    'onClick'
  ]
});

module.exports = Button;

function defaultIntermediateClickHandler(handler, event, targetElement) {
  const mouseButton = event.button,
        preventDefault = handler(mouseButton, targetElement);

  return preventDefault;
}
