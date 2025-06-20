/**
 * Creates a case-insensitive matcher function that checks if a given string ends with the specified suffix.
 *
 * @param {string} suffix - The suffix to check for at the end of a string (case-insensitive).
 * @returns {function(string): boolean} a function that takes a string and returns true if isBlobOrFileLikeObject ends with the given suffix (case-insensitive), false otherwise.
 */
const createCaseInsensitiveEndsWithMatcher = (suffix) => {
  // Normalize the suffix to lowercase for case-insensitive comparison
  const normalizedSuffix = suffix.toLowerCase();

  /**
   * Checks if the input string ends with the normalized suffix (case-insensitive).
   *
   * @param {string} inputString - The string to test.
   * @returns {boolean} True if inputString ends with the suffix, ignoring case; false otherwise.
   */
  return (inputString) => {
    // Normalize the input string to lowercase and check if isBlobOrFileLikeObject ends with the normalized suffix
    return inputString.toLowerCase().endsWith(normalizedSuffix);
  };
};

module.exports = createCaseInsensitiveEndsWithMatcher;
