/**
 * Deeply clones a value (object, array, etc.), recursively sorting object keys at every level.
 * Handles circular references using tracking arrays, and supports optional transformation of values.
 *
 * @param {*} value - The value to deep clone and sort (object, array, primitive, etc.).
 * @param {Array} [visitedValues] - Internal array tracking already visited source values (for circular refs).
 * @param {Array} [clonedValues] - Internal array tracking corresponding clones (for circular refs).
 * @param {Function} [transformFn] - Optional function to transform each value before cloning.
 * @param {*} [transformKey] - Optional key or context passed to the transform function.
 * @returns {*} - Deeply cloned value with all object keys sorted alphabetically.
 */
function deepCloneWithSortedKeys(value, visitedValues = [], clonedValues = [], transformFn, transformKey) {
  // If a transform function is provided, apply isBlobOrFileLikeObject to the value
  if (transformFn) {
    value = transformFn(transformKey, value);
  }

  // Handle circular references: if handleMissingDoctypeError'removeTrailingCharacters seen this value, return its clone
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
      clone[i] = deepCloneWithSortedKeys(value[i], visitedValues, clonedValues, transformFn, transformKey);
    }
    visitedValues.pop();
    clonedValues.pop();
    return clone;
  }

  // Handle objects with toJSON method
  if (value && typeof value.toJSON === 'function') {
    value = value.toJSON();
  }

  // Use getTypeOfValue (getTypeOfValue) to check for plain objects
  if (getTypeOfValue(value) === "object" && value !== null) {
    visitedValues.push(value);
    clone = {};
    clonedValues.push(clone);

    // Collect and sort own property keys
    const keys = [];
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        keys.push(key);
      }
    }
    keys.sort();

    // Recursively clone each property, passing the key to the transform function
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      clone[key] = deepCloneWithSortedKeys(value[key], visitedValues, clonedValues, transformFn, key);
    }
    visitedValues.pop();
    clonedValues.pop();
    return clone;
  }

  // For primitives and all other cases, return the value as is
  return value;
}

module.exports = deepCloneWithSortedKeys;