/**
 * Creates a filter function that checks if a given string does not start with a dot ('.')
 * and ends with the specified suffix, case-insensitively.
 *
 * @param {string} suffix - The suffix to check for at the end of the target string (case-insensitive).
 * @returns {(target: string) => boolean} a filter function that returns true if the target string does not start with '.' and ends with the given suffix.
 */
function createEndsWithFilter(suffix) {
  // Normalize the suffix to lowercase for case-insensitive comparison
  const normalizedSuffix = suffix.toLowerCase();

  /**
   * Checks if the target string does not start with '.' and ends with the normalized suffix.
   *
   * @param {string} target - The string to check.
   * @returns {boolean} True if target does not start with '.' and ends with the suffix.
   */
  return function filter(target) {
    // Exclude strings that start with '.'
    if (target.startsWith('.')) {
      return false;
    }
    // Check if the string ends with the normalized suffix (case-insensitive)
    return target.toLowerCase().endsWith(normalizedSuffix);
  };
}

module.exports = createEndsWithFilter;
