/**
 * Throws a TypeError if the provided object is not an instance of the given constructor.
 *
 * @param {object} objectToCheck - The object to validate as an instance of the constructor.
 * @param {Function} classConstructor - The constructor function (class) to check against.
 * @throws {TypeError} Throws if objectToCheck is not an instance of classConstructor.
 */
function validateClassInstance(objectToCheck, classConstructor) {
  // Check if objectToCheck is an instance of classConstructor
  if (!(objectToCheck instanceof classConstructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = validateClassInstance;