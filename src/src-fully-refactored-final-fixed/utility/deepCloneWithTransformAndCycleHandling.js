/**
 * Deeply clones a value (array or object), handling reference cycles and optionally applying a transform function to each value.
 * Supports custom transformation and preserves reference cycles by tracking visited objects/arrays.
 *
 * @param {*} value - The value to deeply clone (can be object, array, or primitive).
 * @param {Array} [visitedValues=[]] - Internal array tracking visited objects/arrays to handle cycles.
 * @param {Array} [clonedValues=[]] - Internal array tracking corresponding clones for visited values.
 * @param {Function} [transformFn] - Optional function to transform each value before cloning.
 * @param {*} [transformKey] - Optional key or context passed to the transform function.
 * @returns {*} The deeply cloned value, with cycles and optional transformation handled.
 */
function deepCloneWithTransformAndCycleHandling(
  value,
  visitedValues = [],
  clonedValues = [],
  transformFn,
  transformKey
) {
  // Apply transform function if provided
  if (transformFn) {
    value = transformFn(transformKey, value);
  }

  // Check for cycles: if value already visited, return its clone
  for (let i = 0; i < visitedValues.length; i++) {
    if (visitedValues[i] === value) {
      return clonedValues[i];
    }
  }

  // Handle arrays
  if (Object.prototype.toString.call(value) === '[object Array]') {
    visitedValues.push(value);
    const clonedArray = new Array(value.length);
    clonedValues.push(clonedArray);
    for (let i = 0; i < value.length; i++) {
      clonedArray[i] = deepCloneWithTransformAndCycleHandling(
        value[i],
        visitedValues,
        clonedValues,
        transformFn,
        transformKey
      );
    }
    visitedValues.pop();
    clonedValues.pop();
    return clonedArray;
  }

  // Handle objects with toJSON
  if (value && typeof value.toJSON === 'function') {
    value = value.toJSON();
  }

  // Handle plain objects
  if (getTypeOfValue(value) === 'object' && value !== null) {
    visitedValues.push(value);
    const clonedObject = {};
    clonedValues.push(clonedObject);
    // Collect own property keys and sort them
    const propertyKeys = [];
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        propertyKeys.push(key);
      }
    }
    propertyKeys.sort();
    // Recursively clone each property
    for (let i = 0; i < propertyKeys.length; i++) {
      const key = propertyKeys[i];
      clonedObject[key] = deepCloneWithTransformAndCycleHandling(
        value[key],
        visitedValues,
        clonedValues,
        transformFn,
        key
      );
    }
    visitedValues.pop();
    clonedValues.pop();
    return clonedObject;
  }

  // For primitives and all other cases, return as is
  return value;
}

module.exports = deepCloneWithTransformAndCycleHandling;