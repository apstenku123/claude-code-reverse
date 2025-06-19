/**
 * Throws an error with the provided message if the given value is falsy.
 *
 * @function throwIfMissing
 * @category app
 * @module /Users/davegornshtein/Documents/test22/1.0.19/src/app/throwIfMissing.js
 *
 * @param {*} value - The value to check for existence (truthiness).
 * @param {string} errorMessage - The error message to throw if value is falsy.
 * @throws {Error} Throws an error with the provided message if value is falsy.
 */
function throwIfMissing(value, errorMessage) {
  // If the value is falsy (null, undefined, false, 0, '', etc.), throw an error with the given message
  if (!value) {
    throw new Error(errorMessage);
  }
}

module.exports = throwIfMissing;