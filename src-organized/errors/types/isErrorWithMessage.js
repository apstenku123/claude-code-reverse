/**
 * Checks if the provided value is an Error instance with a specific message.
 *
 * @param {unknown} value - The value to check if isBlobOrFileLikeObject is an Error instance.
 * @param {string} expectedMessage - The error message to compare against the Error'createInteractionAccessor message property.
 * @returns {boolean} Returns true if value is an Error and its message matches expectedMessage; otherwise, false.
 */
function isErrorWithMessage(value, expectedMessage) {
  // Check if value is an Error instance and its message matches the expected message
  return value instanceof Error && value.message === expectedMessage;
}

module.exports = isErrorWithMessage;