"use strict";

import Element from "../element";

export default class Button extends Element {
  constructor(selector, clickHandler) {
    super(selector);

    if (clickHandler !== null) {
      this.onClick(clickHandler);
    }
  }

  static tagName = "button";

  static ignoredProperties = [
    "onClick"
  ];

  static fromClass(Class, properties) {
    const { onClick = null } = properties,
          clickHandler = onClick, ///
          button = Element.fromClass(Class, properties, clickHandler);
    
    return button;
  }
}
