/**
 * Checks if a given object is an instance of a specified class or constructor function.
 * Safely handles errors that may occur if the check is invalid (e.g., non-function constructor).
 *
 * @param {any} objectToCheck - The object whose type is to be checked.
 * @param {Function} constructorFunction - The constructor function or class to check against.
 * @returns {boolean} True if objectToCheck is an instance of constructorFunction, false otherwise.
 */
function isInstanceOfClass(objectToCheck, constructorFunction) {
  try {
    // Attempt to check if objectToCheck is an instance of constructorFunction
    return objectToCheck instanceof constructorFunction;
  } catch (error) {
    // If constructorFunction is not a valid function or another error occurs, return false
    return false;
  }
}

module.exports = isInstanceOfClass;