/**
 * Throws a TypeError with the provided error message.
 *
 * @param {string} errorMessage - The error message to include in the TypeError.
 * @throws {TypeError} Always throws with the provided message.
 */
const throwTypeErrorWithMessage = (errorMessage) => {
  // Always throw a TypeError with the given message
  throw new TypeError(errorMessage);
};

module.exports = throwTypeErrorWithMessage;
