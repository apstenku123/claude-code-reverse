/**
 * Traverses an object or iterable structure using a path array and returns the resolved value.
 *
 * For each key in the path, attempts to access the property on the current value.
 * If the property does not exist but the current value is iterable, attempts to access the value by index.
 * Returns null if the path cannot be fully resolved.
 *
 * @param {Object|Array|Iterable} rootValue - The initial object, array, or iterable to traverse.
 * @param {Array<string|number>} pathArray - An array of keys or indices representing the path to resolve.
 * @returns {any} The resolved value at the end of the path, or null if not found.
 */
function resolveNestedProperty(rootValue, pathArray) {
  return pathArray.reduce(function (currentValue, pathKey) {
    if (currentValue) {
      // Check if currentValue has the property as its own property
      if (b0.call(currentValue, pathKey)) {
        return currentValue[pathKey];
      }
      // If currentValue is iterable, try to access by index
      if (typeof currentValue[Symbol.iterator] === "function") {
        return Array.from(currentValue)[pathKey];
      }
    }
    // If property not found or currentValue is null/undefined, return null
    return null;
  }, rootValue);
}

module.exports = resolveNestedProperty;