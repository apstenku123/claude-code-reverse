/**
 * Resolves a nested value from an initial object or iterable by traversing a path of keys or indices.
 *
 * For each key/index in the path array, attempts to access the value from the current object:
 *   - If the current value is an object and has the key as its own property, returns that property.
 *   - If the current value is iterable, attempts to access the value at the numeric index.
 *   - If the value cannot be resolved at any step, returns null.
 *
 * @param {object|Iterable} initialValue - The starting object or iterable to resolve from.
 * @param {Array<string|number>} pathArray - An array of keys or indices representing the path to traverse.
 * @returns {any|null} The resolved value at the end of the path, or null if not found.
 */
function resolveNestedValue(initialValue, pathArray) {
  return pathArray.reduce(function (currentValue, pathSegment) {
    if (currentValue) {
      // Check if currentValue has the property as its own property
      if (Object.prototype.hasOwnProperty.call(currentValue, pathSegment)) {
        return currentValue[pathSegment];
      }
      // If currentValue is iterable, try to access by index
      if (typeof currentValue[Symbol.iterator] === "function") {
        return Array.from(currentValue)[pathSegment];
      }
    }
    // If unable to resolve, return null
    return null;
  }, initialValue);
}

module.exports = resolveNestedValue;