'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var TextElement = require('../textElement'),
    arrayUtilities = require('../utilities/array'),
    objectUtilities = require('../utilities/object');

var first = arrayUtilities.first,
    combine = objectUtilities.combine,
    prune = objectUtilities.prune;


function applyProperties() {
  var properties = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaultProperties = arguments[1];
  var ignoredProperties = arguments[2];

  combine(properties, defaultProperties);

  var element = this,
      ///
  childElements = childElementsFromElementAndProperties(element, properties);

  prune(properties, ignoredProperties);

  var names = Object.keys(properties); ///

  names.forEach(function (name) {
    var value = properties[name];

    if (false) {} else if (isHandlerName(name)) {
      addHandler(this, name, value);
    } else if (isAttributeName(name)) {
      addAttribute(this, name, value);
    } else {
      if (!this.hasOwnProperty('properties')) {
        var _properties = {};

        Object.assign(this, {
          properties: _properties
        });
      }

      this.properties[name] = value;
    }
  }.bind(this));

  var parentElement = this; ///

  childElements.forEach(function (childElement) {
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
  var argumentsLength = arguments.length;

  if (argumentsLength === 1) {
    var firstArgument = first(arguments);

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

  names.forEach(function (name) {
    var value = this.context[name],
        propertyName = name,
        ///
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
  applyProperties: applyProperties,
  getProperties: getProperties,
  getContext: getContext,
  getState: getState,
  setState: setState,
  updateState: updateState,
  assignContext: assignContext
};

function updateParentElementContext(childElement, parentElement) {
  var parentContext = typeof childElement.parentContext === 'function' ? childElement.parentContext() : childElement.context;

  parentElement.context = Object.assign({}, parentElement.context, parentContext);

  delete childElement.context;
}

function childElementsFromElementAndProperties(element, properties) {
  var childElements = typeof element.childElements === 'function' ? element.childElements(properties) : properties.childElements;

  childElements = childElements !== undefined ? childElements instanceof Array ? childElements : [childElements] : [];

  childElements = childElements.map(function (childElement) {
    if (typeof childElement === 'string') {
      var text = childElement,
          ///
      textElement = new TextElement(text);

      childElement = textElement; ///
    }

    return childElement;
  });

  return childElements;
}

function addHandler(element, name, value) {
  var eventType = name.substr(2).toLowerCase(),
      ///
  handler = value; ///

  element.on(eventType, handler);
}

function addAttribute(element, name, value) {
  if (name === 'className') {
    name = 'class';
  }

  if (name === 'htmlFor') {
    name = 'for';
  }

  if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
    var keys = Object.keys(value);

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

var attributeNames = ['accept', 'acceptCharset', 'accessKey', 'action', 'allowFullScreen', 'allowTransparency', 'alt', 'async', 'autoComplete', 'autoFocus', 'autoPlay', 'capture', 'cellPadding', 'cellSpacing', 'challenge', 'charSet', 'checked', 'cite', 'classID', 'className', 'colSpan', 'cols', 'content', 'contentEditable', 'contextMenu', 'controls', 'coords', 'crossOrigin', 'data', 'dateTime', 'default', 'defer', 'dir', 'disabled', 'download', 'draggable', 'encType', 'form', 'formAction', 'formEncType', 'formMethod', 'formNoValidate', 'formTarget', 'frameBorder', 'headers', 'height', 'hidden', 'high', 'href', 'hrefLang', 'htmlFor', 'httpEquiv', 'icon', 'id', 'inputMode', 'integrity', 'is', 'keyParams', 'keyType', 'kind', 'label', 'lang', 'list', 'loop', 'low', 'manifest', 'marginHeight', 'marginWidth', 'max', 'maxLength', 'media', 'mediaGroup', 'method', 'min', 'minLength', 'multiple', 'muted', 'name', 'noValidate', 'nonce', 'open', 'optimum', 'pattern', 'placeholder', 'poster', 'preload', 'profile', 'radioGroup', 'readOnly', 'rel', 'required', 'reversed', 'role', 'rowSpan', 'rows', 'sandbox', 'scope', 'scoped', 'scrolling', 'seamless', 'selected', 'shape', 'size', 'sizes', 'span', 'spellCheck', 'src', 'srcDoc', 'srcLang', 'srcSet', 'start', 'step', 'style', 'summary', 'tabIndex', 'target', 'title', 'type', 'useMap', 'value', 'width', 'wmode', 'wrap'];
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9taXhpbnMvanN4LmpzIl0sIm5hbWVzIjpbIlRleHRFbGVtZW50IiwicmVxdWlyZSIsImFycmF5VXRpbGl0aWVzIiwib2JqZWN0VXRpbGl0aWVzIiwiZmlyc3QiLCJjb21iaW5lIiwicHJ1bmUiLCJhcHBseVByb3BlcnRpZXMiLCJwcm9wZXJ0aWVzIiwiZGVmYXVsdFByb3BlcnRpZXMiLCJpZ25vcmVkUHJvcGVydGllcyIsImVsZW1lbnQiLCJjaGlsZEVsZW1lbnRzIiwiY2hpbGRFbGVtZW50c0Zyb21FbGVtZW50QW5kUHJvcGVydGllcyIsIm5hbWVzIiwiT2JqZWN0Iiwia2V5cyIsImZvckVhY2giLCJuYW1lIiwidmFsdWUiLCJpc0hhbmRsZXJOYW1lIiwiYWRkSGFuZGxlciIsImlzQXR0cmlidXRlTmFtZSIsImFkZEF0dHJpYnV0ZSIsImhhc093blByb3BlcnR5IiwiYXNzaWduIiwiYmluZCIsInBhcmVudEVsZW1lbnQiLCJjaGlsZEVsZW1lbnQiLCJ1cGRhdGVQYXJlbnRFbGVtZW50Q29udGV4dCIsImFkZFRvIiwiZ2V0UHJvcGVydGllcyIsImdldENvbnRleHQiLCJjb250ZXh0IiwiZ2V0U3RhdGUiLCJzdGF0ZSIsInNldFN0YXRlIiwidXBkYXRlU3RhdGUiLCJ1cGRhdGUiLCJhc3NpZ25Db250ZXh0IiwidGhlbkRlbGV0ZSIsImFyZ3VtZW50c0xlbmd0aCIsImFyZ3VtZW50cyIsImxlbmd0aCIsImZpcnN0QXJndW1lbnQiLCJwcm9wZXJ0eU5hbWUiLCJkZXNjcmlwdG9yIiwiZGVmaW5lUHJvcGVydHkiLCJtb2R1bGUiLCJleHBvcnRzIiwicGFyZW50Q29udGV4dCIsInVuZGVmaW5lZCIsIkFycmF5IiwibWFwIiwidGV4dCIsInRleHRFbGVtZW50IiwiZXZlbnRUeXBlIiwic3Vic3RyIiwidG9Mb3dlckNhc2UiLCJoYW5kbGVyIiwib24iLCJrZXkiLCJkb21FbGVtZW50IiwibWF0Y2giLCJhdHRyaWJ1dGVOYW1lcyIsImluY2x1ZGVz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QWZ4RSxFQWVnRixZQWZoRixFQWU4RixLQWY5RixFQWVxRyxRQWZyRyxFQWUrRyxTQWYvRyxFQWUwSCxRQWYxSCxFQWVvSSxPQWZwSSxFQWU2SSxNQWY3SSxFQWVxSixPQWZySixFQWU4SixTQWY5SixFQWdCckIsVUFoQnFCLEVBZ0JULFFBaEJTLEVBZ0JDLE9BaEJELEVBZ0JVLE1BaEJWLEVBaUJyQixRQWpCcUIsRUFrQnJCLE9BbEJxQixFQW1CckIsT0FuQnFCLEVBb0JyQixPQXBCcUIsRUFxQnJCLE1BckJxQixDQUF2QiIsImZpbGUiOiJqc3guanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmNvbnN0IFRleHRFbGVtZW50ID0gcmVxdWlyZSgnLi4vdGV4dEVsZW1lbnQnKSxcbiAgICAgIGFycmF5VXRpbGl0aWVzID0gcmVxdWlyZSgnLi4vdXRpbGl0aWVzL2FycmF5JyksXG4gICAgICBvYmplY3RVdGlsaXRpZXMgPSByZXF1aXJlKCcuLi91dGlsaXRpZXMvb2JqZWN0Jyk7XG5cbmNvbnN0IHsgZmlyc3QgfSA9IGFycmF5VXRpbGl0aWVzLFxuICAgICAgeyBjb21iaW5lLCBwcnVuZSB9ID0gb2JqZWN0VXRpbGl0aWVzO1xuXG5mdW5jdGlvbiBhcHBseVByb3BlcnRpZXMocHJvcGVydGllcyA9IHt9LCBkZWZhdWx0UHJvcGVydGllcywgaWdub3JlZFByb3BlcnRpZXMpIHtcbiAgY29tYmluZShwcm9wZXJ0aWVzLCBkZWZhdWx0UHJvcGVydGllcyk7XG5cbiAgY29uc3QgZWxlbWVudCA9IHRoaXMsIC8vL1xuICAgICAgICBjaGlsZEVsZW1lbnRzID0gY2hpbGRFbGVtZW50c0Zyb21FbGVtZW50QW5kUHJvcGVydGllcyhlbGVtZW50LCBwcm9wZXJ0aWVzKTtcblxuICBwcnVuZShwcm9wZXJ0aWVzLCBpZ25vcmVkUHJvcGVydGllcyk7XG5cbiAgY29uc3QgbmFtZXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0aWVzKTsgIC8vL1xuXG4gIG5hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgIGNvbnN0IHZhbHVlID0gcHJvcGVydGllc1tuYW1lXTtcblxuICAgIGlmIChmYWxzZSkge1xuXG4gICAgfSBlbHNlIGlmIChpc0hhbmRsZXJOYW1lKG5hbWUpKSB7XG4gICAgICBhZGRIYW5kbGVyKHRoaXMsIG5hbWUsIHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKGlzQXR0cmlidXRlTmFtZShuYW1lKSkge1xuICAgICAgYWRkQXR0cmlidXRlKHRoaXMsIG5hbWUsIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCF0aGlzLmhhc093blByb3BlcnR5KCdwcm9wZXJ0aWVzJykpIHtcbiAgICAgICAgY29uc3QgcHJvcGVydGllcyA9IHt9O1xuXG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcywge1xuICAgICAgICAgIHByb3BlcnRpZXNcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucHJvcGVydGllc1tuYW1lXSA9IHZhbHVlO1xuICAgIH1cbiAgfS5iaW5kKHRoaXMpKTtcblxuICBjb25zdCBwYXJlbnRFbGVtZW50ID0gdGhpczsgLy8vXG5cbiAgY2hpbGRFbGVtZW50cy5mb3JFYWNoKGZ1bmN0aW9uKGNoaWxkRWxlbWVudCkge1xuICAgIHVwZGF0ZVBhcmVudEVsZW1lbnRDb250ZXh0KGNoaWxkRWxlbWVudCwgcGFyZW50RWxlbWVudCk7XG5cbiAgICBjaGlsZEVsZW1lbnQuYWRkVG8ocGFyZW50RWxlbWVudCk7XG4gIH0uYmluZCh0aGlzKSk7XG59XG5cbmZ1bmN0aW9uIGdldFByb3BlcnRpZXMoKSB7XG4gIHJldHVybiB0aGlzLnByb3BlcnRpZXM7XG59XG5cbmZ1bmN0aW9uIGdldENvbnRleHQoKSB7XG4gIHJldHVybiB0aGlzLmNvbnRleHQ7XG59XG5cbmZ1bmN0aW9uIGdldFN0YXRlKCkge1xuICByZXR1cm4gdGhpcy5zdGF0ZTtcbn1cblxuZnVuY3Rpb24gc2V0U3RhdGUoc3RhdGUpIHtcbiAgdGhpcy5zdGF0ZSA9IHN0YXRlO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVTdGF0ZSh1cGRhdGUpIHtcbiAgT2JqZWN0LmFzc2lnbih0aGlzLnN0YXRlLCB1cGRhdGUpO1xufVxuXG5mdW5jdGlvbiBhc3NpZ25Db250ZXh0KG5hbWVzLCB0aGVuRGVsZXRlKSB7XG4gIGNvbnN0IGFyZ3VtZW50c0xlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cbiAgaWYgKGFyZ3VtZW50c0xlbmd0aCA9PT0gMSkge1xuICAgIGNvbnN0IGZpcnN0QXJndW1lbnQgPSBmaXJzdChhcmd1bWVudHMpO1xuXG4gICAgaWYgKHR5cGVvZiBmaXJzdEFyZ3VtZW50ID09PSAnYm9vbGVhbicpIHtcbiAgICAgIG5hbWVzID0gT2JqZWN0LmtleXModGhpcy5jb250ZXh0KTtcblxuICAgICAgdGhlbkRlbGV0ZSA9IGZpcnN0QXJndW1lbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoZW5EZWxldGUgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGlmIChhcmd1bWVudHNMZW5ndGggPT09IDApIHtcbiAgICBuYW1lcyA9IE9iamVjdC5rZXlzKHRoaXMuY29udGV4dCk7XG5cbiAgICB0aGVuRGVsZXRlID0gdHJ1ZTtcbiAgfVxuXG4gIG5hbWVzLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5jb250ZXh0W25hbWVdLFxuICAgICAgICAgIHByb3BlcnR5TmFtZSA9IG5hbWUsICAvLy9cbiAgICAgICAgICBkZXNjcmlwdG9yID0ge1xuICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgICAgfTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBwcm9wZXJ0eU5hbWUsIGRlc2NyaXB0b3IpO1xuXG4gICAgaWYgKHRoZW5EZWxldGUpIHtcbiAgICAgIGRlbGV0ZSB0aGlzLmNvbnRleHRbbmFtZV07XG4gICAgfVxuICB9LmJpbmQodGhpcyksIFtdKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFwcGx5UHJvcGVydGllcyxcbiAgZ2V0UHJvcGVydGllcyxcbiAgZ2V0Q29udGV4dCxcbiAgZ2V0U3RhdGUsXG4gIHNldFN0YXRlLFxuICB1cGRhdGVTdGF0ZSxcbiAgYXNzaWduQ29udGV4dFxufTtcblxuZnVuY3Rpb24gdXBkYXRlUGFyZW50RWxlbWVudENvbnRleHQoY2hpbGRFbGVtZW50LCBwYXJlbnRFbGVtZW50KSB7XG4gIGNvbnN0IHBhcmVudENvbnRleHQgPSAodHlwZW9mIGNoaWxkRWxlbWVudC5wYXJlbnRDb250ZXh0ID09PSAnZnVuY3Rpb24nKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkRWxlbWVudC5wYXJlbnRDb250ZXh0KCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkRWxlbWVudC5jb250ZXh0O1xuXG4gIHBhcmVudEVsZW1lbnQuY29udGV4dCA9IE9iamVjdC5hc3NpZ24oe30sIHBhcmVudEVsZW1lbnQuY29udGV4dCwgcGFyZW50Q29udGV4dCk7XG5cbiAgZGVsZXRlIGNoaWxkRWxlbWVudC5jb250ZXh0O1xufVxuXG5mdW5jdGlvbiBjaGlsZEVsZW1lbnRzRnJvbUVsZW1lbnRBbmRQcm9wZXJ0aWVzKGVsZW1lbnQsIHByb3BlcnRpZXMpIHtcbiAgbGV0IGNoaWxkRWxlbWVudHMgPSAodHlwZW9mIGVsZW1lbnQuY2hpbGRFbGVtZW50cyA9PT0gJ2Z1bmN0aW9uJykgP1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxlbWVudC5jaGlsZEVsZW1lbnRzKHByb3BlcnRpZXMpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydGllcy5jaGlsZEVsZW1lbnRzO1xuXG4gIGNoaWxkRWxlbWVudHMgPSAoY2hpbGRFbGVtZW50cyAhPT0gdW5kZWZpbmVkKSA/XG4gICAgICAgICAgICAgICAgICAgKChjaGlsZEVsZW1lbnRzIGluc3RhbmNlb2YgQXJyYXkpID9cbiAgICAgICAgICAgICAgICAgICAgICAgY2hpbGRFbGVtZW50cyA6XG4gICAgICAgICAgICAgICAgICAgICAgICBbY2hpbGRFbGVtZW50c10pIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgW107XG5cbiAgY2hpbGRFbGVtZW50cyA9IGNoaWxkRWxlbWVudHMubWFwKGZ1bmN0aW9uKGNoaWxkRWxlbWVudCkge1xuICAgIGlmICh0eXBlb2YgY2hpbGRFbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgdGV4dCA9IGNoaWxkRWxlbWVudCwgIC8vL1xuICAgICAgICAgICAgdGV4dEVsZW1lbnQgPSBuZXcgVGV4dEVsZW1lbnQodGV4dCk7XG5cbiAgICAgIGNoaWxkRWxlbWVudCA9IHRleHRFbGVtZW50OyAvLy9cbiAgICB9XG5cbiAgICByZXR1cm4gY2hpbGRFbGVtZW50O1xuICB9KTtcblxuICByZXR1cm4gY2hpbGRFbGVtZW50cztcbn1cblxuZnVuY3Rpb24gYWRkSGFuZGxlcihlbGVtZW50LCBuYW1lLCB2YWx1ZSkge1xuICBjb25zdCBldmVudFR5cGUgPSBuYW1lLnN1YnN0cigyKS50b0xvd2VyQ2FzZSgpLCAvLy9cbiAgICAgICAgaGFuZGxlciA9IHZhbHVlOyAgLy8vXG5cbiAgZWxlbWVudC5vbihldmVudFR5cGUsIGhhbmRsZXIpO1xufVxuXG5mdW5jdGlvbiBhZGRBdHRyaWJ1dGUoZWxlbWVudCwgbmFtZSwgdmFsdWUpIHtcbiAgaWYgKG5hbWUgPT09ICdjbGFzc05hbWUnKSB7XG4gICAgbmFtZSA9ICdjbGFzcyc7XG4gIH1cblxuICBpZiAobmFtZSA9PT0gJ2h0bWxGb3InKSB7XG4gICAgbmFtZSA9ICdmb3InO1xuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcbiAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModmFsdWUpO1xuXG4gICAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIGVsZW1lbnQuZG9tRWxlbWVudFtuYW1lXVtrZXldID0gdmFsdWVba2V5XTtcbiAgICB9LmJpbmQodGhpcykpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICB2YWx1ZSA9IG5hbWU7IC8vL1xuXG4gICAgICBlbGVtZW50LmFkZEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGVsZW1lbnQuYWRkQXR0cmlidXRlKG5hbWUsIHZhbHVlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc0hhbmRsZXJOYW1lKG5hbWUpIHtcbiAgcmV0dXJuIG5hbWUubWF0Y2goL15vbi8pO1xufVxuXG5mdW5jdGlvbiBpc0F0dHJpYnV0ZU5hbWUobmFtZSkge1xuICByZXR1cm4gYXR0cmlidXRlTmFtZXMuaW5jbHVkZXMobmFtZSk7XG59XG5cbmNvbnN0IGF0dHJpYnV0ZU5hbWVzID0gW1xuICAnYWNjZXB0JywgJ2FjY2VwdENoYXJzZXQnLCAnYWNjZXNzS2V5JywgJ2FjdGlvbicsICdhbGxvd0Z1bGxTY3JlZW4nLCAnYWxsb3dUcmFuc3BhcmVuY3knLCAnYWx0JywgJ2FzeW5jJywgJ2F1dG9Db21wbGV0ZScsICdhdXRvRm9jdXMnLCAnYXV0b1BsYXknLFxuICAnY2FwdHVyZScsICdjZWxsUGFkZGluZycsICdjZWxsU3BhY2luZycsICdjaGFsbGVuZ2UnLCAnY2hhclNldCcsICdjaGVja2VkJywgJ2NpdGUnLCAnY2xhc3NJRCcsICdjbGFzc05hbWUnLCAnY29sU3BhbicsICdjb2xzJywgJ2NvbnRlbnQnLCAnY29udGVudEVkaXRhYmxlJywgJ2NvbnRleHRNZW51JywgJ2NvbnRyb2xzJywgJ2Nvb3JkcycsICdjcm9zc09yaWdpbicsXG4gICdkYXRhJywgJ2RhdGVUaW1lJywgJ2RlZmF1bHQnLCAnZGVmZXInLCAnZGlyJywgJ2Rpc2FibGVkJywgJ2Rvd25sb2FkJywgJ2RyYWdnYWJsZScsXG4gICdlbmNUeXBlJyxcbiAgJ2Zvcm0nLCAnZm9ybUFjdGlvbicsICdmb3JtRW5jVHlwZScsICdmb3JtTWV0aG9kJywgJ2Zvcm1Ob1ZhbGlkYXRlJywgJ2Zvcm1UYXJnZXQnLCAnZnJhbWVCb3JkZXInLFxuICAnaGVhZGVycycsICdoZWlnaHQnLCAnaGlkZGVuJywgJ2hpZ2gnLCAnaHJlZicsICdocmVmTGFuZycsICdodG1sRm9yJywgJ2h0dHBFcXVpdicsXG4gICdpY29uJywgJ2lkJywgJ2lucHV0TW9kZScsICdpbnRlZ3JpdHknLCAnaXMnLFxuICAna2V5UGFyYW1zJywgJ2tleVR5cGUnLCAna2luZCcsXG4gICdsYWJlbCcsICdsYW5nJywgJ2xpc3QnLCAnbG9vcCcsICdsb3cnLFxuICAnbWFuaWZlc3QnLCAnbWFyZ2luSGVpZ2h0JywgJ21hcmdpbldpZHRoJywgJ21heCcsICdtYXhMZW5ndGgnLCAnbWVkaWEnLCAnbWVkaWFHcm91cCcsICdtZXRob2QnLCAnbWluJywgJ21pbkxlbmd0aCcsICdtdWx0aXBsZScsICdtdXRlZCcsXG4gICduYW1lJywgJ25vVmFsaWRhdGUnLCAnbm9uY2UnLFxuICAnb3BlbicsICdvcHRpbXVtJyxcbiAgJ3BhdHRlcm4nLCAncGxhY2Vob2xkZXInLCAncG9zdGVyJywgJ3ByZWxvYWQnLCAncHJvZmlsZScsXG4gICdyYWRpb0dyb3VwJywgJ3JlYWRPbmx5JywgJ3JlbCcsICdyZXF1aXJlZCcsICdyZXZlcnNlZCcsICdyb2xlJywgJ3Jvd1NwYW4nLCAncm93cycsXG4gICdzYW5kYm94JywgJ3Njb3BlJywgJ3Njb3BlZCcsICdzY3JvbGxpbmcnLCAnc2VhbWxlc3MnLCAnc2VsZWN0ZWQnLCAnc2hhcGUnLCAnc2l6ZScsICdzaXplcycsICdzcGFuJywgJ3NwZWxsQ2hlY2snLCAnc3JjJywgJ3NyY0RvYycsICdzcmNMYW5nJywgJ3NyY1NldCcsICdzdGFydCcsICdzdGVwJywgJ3N0eWxlJywgJ3N1bW1hcnknLFxuICAndGFiSW5kZXgnLCAndGFyZ2V0JywgJ3RpdGxlJywgJ3R5cGUnLFxuICAndXNlTWFwJyxcbiAgJ3ZhbHVlJyxcbiAgJ3dpZHRoJyxcbiAgJ3dtb2RlJyxcbiAgJ3dyYXAnXG5dO1xuIl19