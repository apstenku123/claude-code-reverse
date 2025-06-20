/**
 * Copies all enumerable own properties from the source object to the target object.
 *
 * @param {Object} targetObject - The object to which properties will be copied.
 * @param {Object} sourceObject - The object from which properties will be copied.
 * @returns {void}
 *
 * @example
 * const target = { a: 1 };
 * const source = { b: 2, c: 3 };
 * copyProperties(target, source);
 * // target is now { a: 1, b: 2, c: 3 }
 */
function copyProperties(targetObject, sourceObject) {
  // Iterate over all enumerable properties in sourceObject
  for (const propertyName in sourceObject) {
    // Copy each property to targetObject
    targetObject[propertyName] = sourceObject[propertyName];
  }
}

module.exports = copyProperties;
