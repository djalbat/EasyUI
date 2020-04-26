"use strict";

export function combine(targetObject, sourceObject = {}) {
  const sourceKeys = Object.keys(sourceObject);

  sourceKeys.forEach(function(sourceKey) {
    const targetProperty = targetObject[sourceKey],
          sourceProperty = sourceObject[sourceKey];

    targetObject[sourceKey] = targetObject.hasOwnProperty(sourceKey) ?
                               `${targetProperty} ${sourceProperty}` :
                                  sourceProperty;
  });
}

export function prune(targetObject, sourceKeys) {
  sourceKeys.forEach(function(sourceKey) {
    if (targetObject.hasOwnProperty(sourceKey)) {
      delete targetObject[sourceKey];
    }
  });
}
