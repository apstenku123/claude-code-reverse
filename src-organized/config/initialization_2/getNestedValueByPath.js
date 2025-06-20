/**
 * Retrieves a nested value from an initial object or iterable by traversing a path array.
 * At each step, if the current value is an object with the path key, returns that property.
 * If the current value is iterable, returns the element at the path index.
 * If neither, or if any step fails, returns null.
 *
 * @param {Object|Iterable} initialValue - The starting object or iterable to traverse.
 * @param {Array<string|number>} pathArray - An array representing the path to traverse.
 * @returns {any} The value found at the end of the path, or null if not found.
 */
function getNestedValueByPath(initialValue, pathArray) {
  return pathArray.reduce((currentValue, pathKey) => {
    if (currentValue) {
      // If currentValue has own property pathKey, return that property
      if (b0.call(currentValue, pathKey)) {
        return currentValue[pathKey];
      }
      // If currentValue is iterable, return the element at pathKey index
      if (typeof currentValue[Symbol.iterator] === "function") {
        return Array.from(currentValue)[pathKey];
      }
    }
    // If neither, or if currentValue is null/undefined, return null
    return null;
  }, initialValue);
}

module.exports = getNestedValueByPath;