/**
 * Deeply clones a value, handling circular references and allowing for a custom transformation handler.
 *
 * @param {*} value - The value to clone.
 * @param {Array} [visitedValues=[]] - Internal array tracking visited objects/arrays to handle circular references.
 * @param {Array} [clonedValues=[]] - Internal array tracking corresponding clones for visited values.
 * @param {Function} [customHandler] - Optional function to transform the value before cloning.
 * @param {*} [handlerContext] - Optional context passed to the custom handler.
 * @returns {*} - The deeply cloned value, with circular references and custom transformations handled.
 */
function deepCloneWithCustomHandler(
  value,
  visitedValues = [],
  clonedValues = [],
  customHandler,
  handlerContext
) {
  // If a custom handler is provided, transform the value before cloning
  if (customHandler) {
    value = customHandler(handlerContext, value);
  }

  // Check for circular references
  for (let i = 0; i < visitedValues.length; i += 1) {
    if (visitedValues[i] === value) {
      return clonedValues[i];
    }
  }

  // Handle arrays
  if (Object.prototype.toString.call(value) === "[object Array]") {
    visitedValues.push(value);
    const clonedArray = new Array(value.length);
    clonedValues.push(clonedArray);
    for (let i = 0; i < value.length; i += 1) {
      clonedArray[i] = deepCloneWithCustomHandler(
        value[i],
        visitedValues,
        clonedValues,
        customHandler,
        handlerContext
      );
    }
    visitedValues.pop();
    clonedValues.pop();
    return clonedArray;
  }

  // Handle objects with toJSON method
  if (value && typeof value.toJSON === 'function') {
    value = value.toJSON();
  }

  // Handle plain objects
  if (getTypeOfValue(value) === "object" && value !== null) {
    visitedValues.push(value);
    const clonedObject = {};
    clonedValues.push(clonedObject);
    // Collect and sort keys for deterministic cloning
    const keys = [];
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        keys.push(key);
      }
    }
    keys.sort();
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      clonedObject[key] = deepCloneWithCustomHandler(
        value[key],
        visitedValues,
        clonedValues,
        customHandler,
        key
      );
    }
    visitedValues.pop();
    clonedValues.pop();
    return clonedObject;
  }

  // For primitives and other types, return as is
  return value;
}

module.exports = deepCloneWithCustomHandler;