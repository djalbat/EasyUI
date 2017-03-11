'use strict';

function onMouseUp(handler) {
  if (handler.intermediateHandler === undefined) {
    handler.intermediateHandler = function(handler, event) {
      const mouseTop = event.pageY,  ///
            mouseLeft = event.pageX, ///
            mouseButton = event.button, ///
            preventDefault = handler(mouseTop, mouseLeft, mouseButton);
      
      return preventDefault;
    }
  }
  
  this.on('mouseup', handler); 
}

function onMouseDown(handler) {
  if (handler.intermediateHandler === undefined) {
    handler.intermediateHandler = function(handler, event) {
      const mouseTop = event.pageY,  ///
            mouseLeft = event.pageX, ///
            mouseButton = event.button, ///
            preventDefault = handler(mouseTop, mouseLeft, mouseButton);

      return preventDefault;
    }
  }

  this.on('mousedown', handler); 
}

function onMouseOver(handler) {
  if (handler.intermediateHandler === undefined) {
    handler.intermediateHandler = function(handler, event) {
      const mouseTop = event.pageY,  ///
            mouseLeft = event.pageX, ///
            preventDefault = handler(mouseTop, mouseLeft);

      return preventDefault;
    }
  }

  this.on('mouseover', handler); 
}

function onMouseOut(handler) {
  if (handler.intermediateHandler === undefined) {
    handler.intermediateHandler = function(handler, event) {
      const mouseTop = event.pageY,  ///
            mouseLeft = event.pageX, ///
            preventDefault = handler(mouseTop, mouseLeft);

      return preventDefault;
    }
  }

  this.on('mouseout', handler); 
}

function onMouseMove(handler) {
  if (handler.intermediateHandler === undefined) {
    handler.intermediateHandler = function(handler, event) {
      const mouseTop = event.pageY,  ///
            mouseLeft = event.pageX, ///
            preventDefault = handler(mouseTop, mouseLeft);

      return preventDefault;
    }
  }

  this.on('mousemove', handler); 
}

function offMouseUp(handler) { this.off('mouseup', handler); }

function offMouseDown(handler) { this.off('mousedown', handler); }

function offMouseOver(handler) { this.off('mouseover', handler); }

function offMouseOut(handler) { this.off('mouseout', handler); }

function offMouseMove(handler) { this.off('mousemove', handler); }

const mouse = {
  onMouseUp: onMouseUp,
  onMouseDown: onMouseDown,
  onMouseOver: onMouseOver,
  onMouseOut: onMouseOut,
  onMouseMove: onMouseMove,
  offMouseUp: offMouseUp,
  offMouseDown: offMouseDown,
  offMouseOver: offMouseOver,
  offMouseOut: offMouseOut,
  offMouseMove: offMouseMove
};

module.exports = mouse;
