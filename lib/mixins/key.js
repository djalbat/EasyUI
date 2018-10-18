'use strict';

function onKeyUp(handler, element) {
  var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateHandler;

  this.on('keyup', handler, element, intermediateHandler);
}

function onKeyDown(handler, element) {
  var intermediateHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultIntermediateHandler;

  this.on('keydown', handler, element, intermediateHandler);
}

function offKeyUp(handler, element) {
  this.off('keyup', handler, element);
}

function offKeyDown(handler, element) {
  this.off('keydown', handler, element);
}

module.exports = {
  onKeyUp: onKeyUp,
  onKeyDown: onKeyDown,
  offKeyUp: offKeyUp,
  offKeyDown: offKeyDown
};

function defaultIntermediateHandler(handler, event, element) {
  var keyCode = event.keyCode;


  handler.call(element, keyCode, event);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2VzNi9taXhpbnMva2V5LmpzIl0sIm5hbWVzIjpbIm9uS2V5VXAiLCJoYW5kbGVyIiwiZWxlbWVudCIsImludGVybWVkaWF0ZUhhbmRsZXIiLCJkZWZhdWx0SW50ZXJtZWRpYXRlSGFuZGxlciIsIm9uIiwib25LZXlEb3duIiwib2ZmS2V5VXAiLCJvZmYiLCJvZmZLZXlEb3duIiwibW9kdWxlIiwiZXhwb3J0cyIsImV2ZW50Iiwia2V5Q29kZSIsImNhbGwiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBLFNBQVNBLE9BQVQsQ0FBaUJDLE9BQWpCLEVBQTBCQyxPQUExQixFQUFxRjtBQUFBLE1BQWxEQyxtQkFBa0QsdUVBQTVCQywwQkFBNEI7O0FBQ25GLE9BQUtDLEVBQUwsQ0FBUSxPQUFSLEVBQWlCSixPQUFqQixFQUEwQkMsT0FBMUIsRUFBbUNDLG1CQUFuQztBQUNEOztBQUVELFNBQVNHLFNBQVQsQ0FBbUJMLE9BQW5CLEVBQTRCQyxPQUE1QixFQUF1RjtBQUFBLE1BQWxEQyxtQkFBa0QsdUVBQTVCQywwQkFBNEI7O0FBQ3JGLE9BQUtDLEVBQUwsQ0FBUSxTQUFSLEVBQW1CSixPQUFuQixFQUE0QkMsT0FBNUIsRUFBcUNDLG1CQUFyQztBQUNEOztBQUVELFNBQVNJLFFBQVQsQ0FBa0JOLE9BQWxCLEVBQTJCQyxPQUEzQixFQUFvQztBQUFFLE9BQUtNLEdBQUwsQ0FBUyxPQUFULEVBQWtCUCxPQUFsQixFQUEyQkMsT0FBM0I7QUFBc0M7O0FBRTVFLFNBQVNPLFVBQVQsQ0FBb0JSLE9BQXBCLEVBQTZCQyxPQUE3QixFQUFzQztBQUFFLE9BQUtNLEdBQUwsQ0FBUyxTQUFULEVBQW9CUCxPQUFwQixFQUE2QkMsT0FBN0I7QUFBd0M7O0FBRWhGUSxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZYLGtCQURlO0FBRWZNLHNCQUZlO0FBR2ZDLG9CQUhlO0FBSWZFO0FBSmUsQ0FBakI7O0FBT0EsU0FBU0wsMEJBQVQsQ0FBb0NILE9BQXBDLEVBQTZDVyxLQUE3QyxFQUFvRFYsT0FBcEQsRUFBNkQ7QUFBQSxNQUNuRFcsT0FEbUQsR0FDdkNELEtBRHVDLENBQ25EQyxPQURtRDs7O0FBRzNEWixVQUFRYSxJQUFSLENBQWFaLE9BQWIsRUFBc0JXLE9BQXRCLEVBQStCRCxLQUEvQjtBQUNEIiwiZmlsZSI6ImtleS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gb25LZXlVcChoYW5kbGVyLCBlbGVtZW50LCBpbnRlcm1lZGlhdGVIYW5kbGVyID0gZGVmYXVsdEludGVybWVkaWF0ZUhhbmRsZXIpIHtcbiAgdGhpcy5vbigna2V5dXAnLCBoYW5kbGVyLCBlbGVtZW50LCBpbnRlcm1lZGlhdGVIYW5kbGVyKTtcbn1cblxuZnVuY3Rpb24gb25LZXlEb3duKGhhbmRsZXIsIGVsZW1lbnQsIGludGVybWVkaWF0ZUhhbmRsZXIgPSBkZWZhdWx0SW50ZXJtZWRpYXRlSGFuZGxlcikge1xuICB0aGlzLm9uKCdrZXlkb3duJywgaGFuZGxlciwgZWxlbWVudCwgaW50ZXJtZWRpYXRlSGFuZGxlcik7XG59XG5cbmZ1bmN0aW9uIG9mZktleVVwKGhhbmRsZXIsIGVsZW1lbnQpIHsgdGhpcy5vZmYoJ2tleXVwJywgaGFuZGxlciwgZWxlbWVudCk7IH1cblxuZnVuY3Rpb24gb2ZmS2V5RG93bihoYW5kbGVyLCBlbGVtZW50KSB7IHRoaXMub2ZmKCdrZXlkb3duJywgaGFuZGxlciwgZWxlbWVudCk7IH1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG9uS2V5VXAsXG4gIG9uS2V5RG93bixcbiAgb2ZmS2V5VXAsXG4gIG9mZktleURvd25cbn07XG5cbmZ1bmN0aW9uIGRlZmF1bHRJbnRlcm1lZGlhdGVIYW5kbGVyKGhhbmRsZXIsIGV2ZW50LCBlbGVtZW50KSB7XG4gIGNvbnN0IHsga2V5Q29kZSB9ID0gZXZlbnQ7XG4gIFxuICBoYW5kbGVyLmNhbGwoZWxlbWVudCwga2V5Q29kZSwgZXZlbnQpO1xufVxuIl19