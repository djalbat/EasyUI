'use strict';

const Element = require('../element');

class Select extends Element {
  constructor(selector, changeHandler) {
    super(selector);

    if (changeHandler !== undefined) {
      this.onChange(changeHandler);
    }
  }

  clone(changeHandler) { return Select.clone(this, changeHandler); }

  onChange(changeHandler, intermediateChangeHandler = defaultIntermediateChangeHandler) {
    this.on('change', changeHandler, intermediateChangeHandler);
  }

  offChange(changeHandler) {
    this.off('change', changeHandler);
  }

  getSelectedOptionValue() {
    const domElement = this.getDOMElement(),
          selectedOptionValue = domElement.value;  ///
    
    return selectedOptionValue;
  }

  setSelectedOptionByValue(selectedOptionValue) {
    const value = selectedOptionValue,  ///
          domElement = this.getDOMElement();
    
    domElement.value = value; 
  }

  static clone(element, changeHandler) { return Element.clone(Select, element, changeHandler); }

  static fromHTML(html, changeHandler) { return Element.fromHTML(Select, html, changeHandler); }

  static fromDOMElement(domElement, changeHandler) { return Element.fromDOMElement(Select, domElement, changeHandler); }

  static fromProperties(properties) {
    const { onChange } = properties,
          changeHandler = onChange, ///
          select = Element.fromProperties(Select, properties, changeHandler);
    
    return select;
  }
}

Object.assign(Select, {
  tagName: 'select',
  ignoredProperties: [
    'onChange'
  ]
});

module.exports = Select;

function defaultIntermediateChangeHandler(changeHandler, event, targetElement) {
  const select = targetElement, ///
        selectedOptionValue = select.getSelectedOptionValue();
  
  changeHandler(selectedOptionValue, event, targetElement);
}
