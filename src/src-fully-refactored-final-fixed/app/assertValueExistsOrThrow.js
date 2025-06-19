/**
 * Throws an error with the provided message if the given value is falsy.
 *
 * @param {*} value - The value to check for existence (truthiness).
 * @param {string} errorMessage - The error message to throw if the value is falsy.
 * @throws {Error} Throws an error with the provided message if value is falsy.
 */
function assertValueExistsOrThrow(value, errorMessage) {
  // If the value is falsy (null, undefined, false, 0, '', etc.), throw an error
  if (!value) {
    throw new Error(errorMessage);
  }
}

module.exports = assertValueExistsOrThrow;