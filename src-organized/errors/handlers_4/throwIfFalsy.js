/**
 * Throws an error with the provided message if the given value is falsy.
 *
 * @param {*} valueToCheck - The value to validate for truthiness.
 * @param {string} errorMessage - The error message to throw if valueToCheck is falsy.
 * @throws {Error} Throws an error with the provided message if valueToCheck is falsy.
 */
function throwIfFalsy(valueToCheck, errorMessage) {
  // If the value is falsy (null, undefined, false, 0, '', etc.), throw an error
  if (!valueToCheck) {
    throw new Error(errorMessage);
  }
}

module.exports = throwIfFalsy;