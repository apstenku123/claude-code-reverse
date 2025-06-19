/**
 * Creates a case-insensitive endsWith predicate function for strings.
 *
 * Given a suffix string, returns a function that checks if another string ends with that suffix, ignoring case.
 *
 * @param {string} suffix - The suffix to check for, case-insensitively.
 * @returns {function(string): boolean} Predicate function that returns true if its argument ends with the given suffix (case-insensitive).
 */
const createCaseInsensitiveEndsWith = (suffix) => {
  // Normalize the suffix to lower case for case-insensitive comparison
  const normalizedSuffix = suffix.toLowerCase();

  /**
   * Checks if the input string ends with the normalized suffix, ignoring case.
   * @param {string} inputString - The string to check.
   * @returns {boolean} True if inputString ends with the suffix (case-insensitive), false otherwise.
   */
  return (inputString) => {
    // Normalize the input string to lower case and check if isBlobOrFileLikeObject ends with the normalized suffix
    return inputString.toLowerCase().endsWith(normalizedSuffix);
  };
};

module.exports = createCaseInsensitiveEndsWith;
