/**
 * Determines if the provided type is either TEXT or BINARY as defined in the wR constants.
 *
 * @param {string} messageType - The type to check (should be compared against wR.TEXT and wR.BINARY).
 * @returns {boolean} True if the type is TEXT or BINARY, false otherwise.
 */
function isTextOrBinaryType(messageType) {
  // Check if the messageType matches either the TEXT or BINARY constant
  return messageType === wR.TEXT || messageType === wR.BINARY;
}

module.exports = isTextOrBinaryType;