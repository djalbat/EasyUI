'use strict';

function on(eventTypes, handler, intermediateHandler) {
  eventTypes = eventTypes.split(' '); ///

  eventTypes.forEach(function(eventType) {
    onEvent(this, eventType, handler, intermediateHandler);
  }.bind(this));
}

function off(eventTypes, handler) {
  eventTypes = eventTypes.split(' '); ///

  eventTypes.forEach(function(eventType) {
    offEvent(this, eventType, handler);
  }.bind(this));
}

const eventMixin = {
  on: on,
  off: off
};

module.exports = eventMixin;

function onEvent(element, eventType, handler, intermediateHandler) {
  if (!Object.hasOwnProperty('eventObjectMap')) {
    const eventObjectMap = {};

    Object.assign(element, {
      eventObjectMap: eventObjectMap
    });
  }

  let eventObject = element.eventObjectMap[eventType];

  if (!eventObject) {
    eventObject = createEventObject();

    element.eventObjectMap[eventType] = eventObject;
  }

  eventObject.addHandler(element, eventType, handler, intermediateHandler);
}

function offEvent(element, eventType, handler) {
  const eventObject = element.eventObjectMap[eventType],
        noneRemaining = eventObject.removeHandler(element, eventType, handler);

  if (noneRemaining) {
    delete element.eventObjectMap[eventType];
  }

  const eventTypes = Object.keys(element.eventObjectMap);

  if (eventTypes.length === 0) {
    delete element.eventObjectMap;
  }
}

function createEventObject() {
  const eventListeners = [];

  function addHandler(element, eventType, handler, intermediateHandler) {
    const targetElement = element,  ///
          eventListener = createEventListener(handler, intermediateHandler, targetElement);

    element.domElement.addEventListener(eventType, eventListener);

    eventListeners.push(eventListener);
  }

  function removeHandler(element, eventType, handler = null) {
    if (handler === null) {
      eventListeners.forEach(function(eventListener) {
        element.domElement.removeEventListener(eventType, eventListener);
      });

      const start = 0;

      eventListeners.splice(start);
    } else {
      const index = indexOfEventListener(eventListeners, handler),
            eventListener = eventListeners[index];

      element.domElement.removeEventListener(eventType, eventListener);

      const start = index,  ///
            deleteCount = 1;

      eventListeners.splice(start, deleteCount);
    }

    const noneRemaining = (eventListeners.length === 0);  ///

    return noneRemaining;
  }

  return {
    addHandler: addHandler,
    removeHandler: removeHandler
  };
}

function indexOfEventListener(eventListeners, handler) {
  let foundIndex = undefined; ///

  eventListeners.forEach(function(eventListener, index) {
    if (eventListener.handler === handler) {  ///
      foundIndex = index;
    }
  });

  const index = foundIndex; ///

  return index;
}

function createEventListener(handler, intermediateHandler, targetElement) {
  const eventListener = function(event) {
    const preventDefault = (intermediateHandler !== undefined) ?
                              intermediateHandler(handler, event, targetElement) :
                                handler(event, targetElement);

    if (preventDefault === true) {
      event.preventDefault();
    }

    event.stopPropagation();
  };

  Object.assign(eventListener, {
    handler: handler
  });

  return eventListener;
}
