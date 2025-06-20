/**
 * Deeply clones a value, supporting custom transformation and handling of circular references.
 *
 * @param {*} value - The value to clone.
 * @param {Array} [visitedValues=[]] - Internal array tracking visited source objects (for circular refs).
 * @param {Array} [clonedValues=[]] - Internal array tracking corresponding clones (for circular refs).
 * @param {Function} [transformFn] - Optional function to transform the value before cloning.
 * @param {*} [transformArg] - Optional argument to pass to the transform function.
 * @returns {*} The deeply cloned (and possibly transformed) value.
 */
function deepCloneWithTransform(value, visitedValues = [], clonedValues = [], transformFn, transformArg) {
  // If a transform function is provided, apply isBlobOrFileLikeObject before cloning
  if (transformFn) {
    value = transformFn(transformArg, value);
  }

  // Handle circular references: if handleMissingDoctypeError'removeTrailingCharacters already cloned this value, return the clone
  for (let i = 0; i < visitedValues.length; i++) {
    if (visitedValues[i] === value) {
      return clonedValues[i];
    }
  }

  let clone;

  // Handle arrays
  if (Object.prototype.toString.call(value) === "[object Array]") {
    visitedValues.push(value);
    clone = new Array(value.length);
    clonedValues.push(clone);
    for (let i = 0; i < value.length; i++) {
      clone[i] = deepCloneWithTransform(value[i], visitedValues, clonedValues, transformFn, transformArg);
    }
    visitedValues.pop();
    clonedValues.pop();
    return clone;
  }

  // Handle objects with toJSON method
  if (value && typeof value.toJSON === 'function') {
    value = value.toJSON();
  }

  // Handle plain objects (excluding null)
  if (getTypeOfValue(value) === "object" && value !== null) {
    visitedValues.push(value);
    clone = {};
    clonedValues.push(clone);
    // Collect and sort own property keys
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
      clone[key] = deepCloneWithTransform(value[key], visitedValues, clonedValues, transformFn, key);
    }
    visitedValues.pop();
    clonedValues.pop();
    return clone;
  }

  // For primitives and functions, return as is
  return value;
}

module.exports = deepCloneWithTransform;