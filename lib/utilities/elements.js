"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeFalseyElements = removeFalseyElements;
exports.replaceStringsWithTextElements = replaceStringsWithTextElements;
var _textElement = _interopRequireDefault(require("../textElement"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
function removeFalseyElements(elements) {
    elements = elements.reduce(function(elements1, element) {
        if (element) {
            elements1.push(element);
        }
        return elements1;
    }, []);
    return elements;
}
function replaceStringsWithTextElements(elements) {
    elements = elements.map(function(element) {
        if (typeof element === "string") {
            var text = element, textElement = new _textElement.default(text);
            element = textElement; ///
        }
        return element;
    });
    return elements;
}

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsaXRpZXMvZWxlbWVudHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmltcG9ydCBUZXh0RWxlbWVudCBmcm9tIFwiLi4vdGV4dEVsZW1lbnRcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbW92ZUZhbHNleUVsZW1lbnRzKGVsZW1lbnRzKSB7XG4gIGVsZW1lbnRzID0gZWxlbWVudHMucmVkdWNlKChlbGVtZW50cywgZWxlbWVudCkgPT4ge1xuICAgIGlmIChlbGVtZW50KSB7XG4gICAgICBlbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xuICAgIH1cblxuICAgIHJldHVybiBlbGVtZW50cztcbiAgfSwgW10pO1xuXG4gIHJldHVybiBlbGVtZW50cztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlcGxhY2VTdHJpbmdzV2l0aFRleHRFbGVtZW50cyhlbGVtZW50cykge1xuICBlbGVtZW50cyA9IGVsZW1lbnRzLm1hcCgoZWxlbWVudCkgPT4geyAgLy8vXG4gICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBjb25zdCB0ZXh0ID0gZWxlbWVudCwgIC8vL1xuICAgICAgICAgICAgdGV4dEVsZW1lbnQgPSBuZXcgVGV4dEVsZW1lbnQodGV4dCk7XG5cbiAgICAgIGVsZW1lbnQgPSB0ZXh0RWxlbWVudDsgLy8vXG4gICAgfVxuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH0pO1xuXG4gIHJldHVybiBlbGVtZW50cztcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQ0FBQSxVQUFBOzs7O1FBSUEsb0JBQUEsR0FBQSxvQkFBQTtRQVlBLDhCQUFBLEdBQUEsOEJBQUE7SUFkQSxZQUFBOzs7Ozs7U0FFQSxvQkFBQSxDQUFBLFFBQUE7QUFDQSxZQUFBLEdBQUEsUUFBQSxDQUFBLE1BQUEsVUFBQSxTQUFBLEVBQUEsT0FBQTtZQUNBLE9BQUE7QUFDQSxxQkFBQSxDQUFBLElBQUEsQ0FBQSxPQUFBOztlQUdBLFNBQUE7O1dBR0EsUUFBQTs7U0FHQSw4QkFBQSxDQUFBLFFBQUE7QUFDQSxZQUFBLEdBQUEsUUFBQSxDQUFBLEdBQUEsVUFBQSxPQUFBO21CQUNBLE9BQUEsTUFBQSxNQUFBO2dCQUNBLElBQUEsR0FBQSxPQUFBLEVBQ0EsV0FBQSxPQWxCQSxZQUFBLFNBa0JBLElBQUE7QUFFQSxtQkFBQSxHQUFBLFdBQUEsQ0FBQSxDQUFBLEVBQUEsQ0FBQTs7ZUFHQSxPQUFBOztXQUdBLFFBQUEifQ==