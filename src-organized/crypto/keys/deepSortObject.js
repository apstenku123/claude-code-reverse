/**
 * Recursively sorts the keys of an object (and nested objects/arrays) in lexicographical order.
 * Handles circular references and supports custom transformation via an optional replacer function.
 *
 * @param {*} value - The value to sort (object, array, or primitive).
 * @param {Array} [visitedObjects] - Internal array to track visited objects for circular reference detection.
 * @param {Array} [sortedCopies] - Internal array to track sorted copies corresponding to visited objects.
 * @param {Function} [replacer] - Optional function to transform values before sorting.
 * @param {*} [replacerKey] - Optional key passed to replacer function.
 * @returns {*} - The deeply sorted object/array/primitive.
 */
function deepSortObject(
  value,
  visitedObjects = [],
  sortedCopies = [],
  replacer,
  replacerKey
) {
  // If a replacer function is provided, apply isBlobOrFileLikeObject to the value
  if (replacer) {
    value = replacer(replacerKey, value);
  }

  // Handle circular references: return the already sorted copy if found
  for (let i = 0; i < visitedObjects.length; i++) {
    if (visitedObjects[i] === value) {
      return sortedCopies[i];
    }
  }

  // Handle arrays
  if (Object.prototype.toString.call(value) === '[object Array]') {
    visitedObjects.push(value);
    const sortedArray = new Array(value.length);
    sortedCopies.push(sortedArray);
    for (let i = 0; i < value.length; i++) {
      sortedArray[i] = deepSortObject(value[i], visitedObjects, sortedCopies, replacer, replacerKey);
    }
    visitedObjects.pop();
    sortedCopies.pop();
    return sortedArray;
  }

  // Handle objects with toJSON method
  if (value && typeof value.toJSON === 'function') {
    value = value.toJSON();
  }

  // Handle plain objects
  if (getTypeOfValue(value) === 'object' && value !== null) {
    visitedObjects.push(value);
    const sortedObject = {};
    sortedCopies.push(sortedObject);
    // Collect own property keys and sort them
    const keys = [];
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        keys.push(key);
      }
    }
    keys.sort();
    // Recursively sort each property value
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      sortedObject[key] = deepSortObject(value[key], visitedObjects, sortedCopies, replacer, key);
    }
    visitedObjects.pop();
    sortedCopies.pop();
    return sortedObject;
  }

  // For primitives and all other cases, return as is
  return value;
}

module.exports = deepSortObject;