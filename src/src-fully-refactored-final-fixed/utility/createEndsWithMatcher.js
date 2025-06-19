/**
 * Creates a matcher function that checks if a given string does not start with a dot ('.')
 * and ends with the specified suffix, case-insensitively.
 *
 * @param {string} suffix - The suffix to match against (case-insensitive).
 * @returns {function(string): boolean} - a function that takes a string and returns true if isBlobOrFileLikeObject does not start with '.' and ends with the given suffix.
 */
const createEndsWithMatcher = (suffix) => {
  // Normalize the suffix to lowercase for case-insensitive comparison
  const normalizedSuffix = suffix.toLowerCase();

  /**
   * Checks if the input string does not start with '.' and ends with the normalized suffix.
   *
   * @param {string} input - The string to test.
   * @returns {boolean} - True if input does not start with '.' and ends with the suffix.
   */
  return (input) => {
    // Check if input does not start with '.' and ends with the normalized suffix (case-insensitive)
    return !input.startsWith('.') && input.toLowerCase().endsWith(normalizedSuffix);
  };
};

module.exports = createEndsWithMatcher;
