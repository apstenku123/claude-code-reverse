/**
 * Generates a standardized error message for an invalid key.
 *
 * @param {string} key - The key that was found to be invalid.
 * @returns {string} a formatted error message indicating the invalid key.
 */
const getInvalidKeyErrorMessage = (key) => {
  // Return a descriptive error message for the provided key
  return `Invalid value for key ${key}`;
};

module.exports = getInvalidKeyErrorMessage;
