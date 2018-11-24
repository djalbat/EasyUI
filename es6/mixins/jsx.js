'use strict';

const TextElement = require('../textElement'),
      arrayUtilities = require('../utilities/array'),
      objectUtilities = require('../utilities/object');

const { first } = arrayUtilities,
      { combine, prune } = objectUtilities;

function applyProperties(properties = {}, defaultProperties, ignoredProperties) {
  combine(properties, defaultProperties);

  const element = this, ///
        childElements = childElementsFromElementAndProperties(element, properties);

  prune(properties, ignoredProperties);

  const names = Object.keys(properties);  ///

  names.forEach(function(name) {
    const value = properties[name];

    if (false) {

    } else if (isHandlerName(name)) {
      addHandler(this, name, value);
    } else if (isAttributeName(name)) {
      addAttribute(this, name, value);
    } else {
      if (!this.hasOwnProperty('properties')) {
        const properties = {};

        Object.assign(this, {
          properties
        });
      }

      this.properties[name] = value;
    }
  }.bind(this));

  const parentElement = this; ///

  childElements.forEach(function(childElement) {
    updateParentElementContext(childElement, parentElement);

    childElement.addTo(parentElement);
  }.bind(this));
}

function getProperties() {
  return this.properties;
}

function getContext() {
  return this.context;
}

function getState() {
  return this.state;
}

function setState(state) {
  this.state = state;
}

function updateState(update) {
  Object.assign(this.state, update);
}

function assignContext(names, thenDelete) {
  const argumentsLength = arguments.length;

  if (argumentsLength === 1) {
    const firstArgument = first(arguments);

    if (typeof firstArgument === 'boolean') {
      names = Object.keys(this.context);

      thenDelete = firstArgument;
    } else {
      thenDelete = true;
    }
  }

  if (argumentsLength === 0) {
    names = Object.keys(this.context);

    thenDelete = true;
  }

  names.forEach(function(name) {
    const value = this.context[name],
          propertyName = name,  ///
          descriptor = {
            value: value
          };

    Object.defineProperty(this, propertyName, descriptor);

    if (thenDelete) {
      delete this.context[name];
    }
  }.bind(this), []);
}

module.exports = {
  applyProperties,
  getProperties,
  getContext,
  getState,
  setState,
  updateState,
  assignContext
};

function updateParentElementContext(childElement, parentElement) {
  const parentContext = (typeof childElement.parentContext === 'function') ?
                          childElement.parentContext() :
                            childElement.context;

  parentElement.context = Object.assign({}, parentElement.context, parentContext);

  delete childElement.context;
}

function childElementsFromElementAndProperties(element, properties) {
  let childElements = (typeof element.childElements === 'function') ?
                        element.childElements(properties) :
                          properties.childElements;

  childElements = (childElements !== undefined) ?
                   ((childElements instanceof Array) ?
                       childElements :
                        [childElements]) :
                          [];

  childElements = childElements.map(function(childElement) {
    if (typeof childElement === 'string') {
      const text = childElement,  ///
            textElement = new TextElement(text);

      childElement = textElement; ///
    }

    return childElement;
  });

  return childElements;
}

function addHandler(element, name, value) {
  const eventType = name.substr(2).toLowerCase(), ///
        handler = value;  ///

  element.on(eventType, handler);
}

function addAttribute(element, name, value) {
  if (name === 'className') {
    name = 'class';
  }

  if (name === 'htmlFor') {
    name = 'for';
  }

  if (typeof value === 'object') {
    const keys = Object.keys(value);

    keys.forEach(function (key) {
      element.domElement[name][key] = value[key];
    }.bind(this));
  } else if (typeof value === 'boolean') {
    if (value) {
      value = name; ///

      element.addAttribute(name, value);
    }
  } else {
    element.addAttribute(name, value);
  }
}

function isHandlerName(name) {
  return name.match(/^on/);
}

function isAttributeName(name) {
  return attributeNames.includes(name);
}

const attributeNames = [
  'accept', 'acceptCharset', 'accessKey', 'action', 'allowFullScreen', 'allowTransparency', 'alt', 'async', 'autoComplete', 'autoFocus', 'autoPlay',
  'capture', 'cellPadding', 'cellSpacing', 'challenge', 'charSet', 'checked', 'cite', 'classID', 'className', 'colSpan', 'cols', 'content', 'contentEditable', 'contextMenu', 'controls', 'coords', 'crossOrigin',
  'd', 'data', 'dateTime', 'default', 'defer', 'dir', 'disabled', 'download', 'draggable',
  'encType',
  'fill', 'form', 'formAction', 'formEncType', 'formMethod', 'formNoValidate', 'formTarget', 'frameBorder',
  'headers', 'height', 'hidden', 'high', 'href', 'hrefLang', 'htmlFor', 'httpEquiv',
  'icon', 'id', 'inputMode', 'integrity', 'is',
  'keyParams', 'keyType', 'kind',
  'label', 'lang', 'list', 'loop', 'low',
  'manifest', 'marginHeight', 'marginWidth', 'max', 'maxLength', 'media', 'mediaGroup', 'method', 'min', 'minLength', 'multiple', 'muted',
  'name', 'noValidate', 'nonce',
  'open', 'optimum',
  'pattern', 'placeholder', 'poster', 'preload', 'profile',
  'radioGroup', 'readOnly', 'rel', 'required', 'reversed', 'role', 'rowSpan', 'rows',
  'sandbox', 'scope', 'scoped', 'scrolling', 'seamless', 'selected', 'shape', 'size', 'sizes', 'span', 'spellCheck', 'src', 'srcDoc', 'srcLang', 'srcSet', 'start', 'step', 'stroke', 'style', 'summary',
  'tabIndex', 'target', 'title', 'transform', 'type',
  'useMap',
  'value',
  'width',
  'wmode',
  'wrap'
];
