/**
 * Checks if a given object is an instance of a specified constructor.
 * Safely handles errors that may occur if the check is invalid (e.g., if the constructor is not a function).
 *
 * @param {any} objectToCheck - The object whose type is being checked.
 * @param {Function} constructorFunction - The constructor function to check against.
 * @returns {boolean} True if objectToCheck is an instance of constructorFunction, false otherwise or if an error occurs.
 */
function isInstanceOf(objectToCheck, constructorFunction) {
  try {
    // Attempt to check if objectToCheck is an instance of constructorFunction
    return objectToCheck instanceof constructorFunction;
  } catch (error) {
    // If an error occurs (e.g., constructorFunction is not a valid function), return false
    return false;
  }
}

module.exports = isInstanceOf;