/**
 * Checks if the provided string is non-empty and does not start with a dot ('.').
 *
 * @param {string} inputString - The string to check.
 * @returns {boolean} True if the string is not empty and does not start with a dot, otherwise false.
 */
const isNonEmptyAndNotDotPrefixed = (inputString) => {
  // Ensure the string is not empty and does not start with a dot
  return inputString.length !== 0 && !inputString.startsWith('.');
};

module.exports = isNonEmptyAndNotDotPrefixed;