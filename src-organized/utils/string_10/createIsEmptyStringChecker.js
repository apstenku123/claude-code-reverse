/**
 * Creates a function that checks if the provided value is an empty string.
 *
 * @returns {function(any, string): boolean} a function that takes two arguments and returns true if the second argument is an empty string.
 */
function createIsEmptyStringChecker() {
  /**
   * Checks if the given stringToCheck is an empty string.
   *
   * @param {any} _unusedParam - An unused parameter (kept for compatibility with original signature).
   * @param {string} stringToCheck - The string to check for emptiness.
   * @returns {boolean} True if stringToCheck is an empty string, false otherwise.
   */
  return function isEmptyString(_unusedParam, stringToCheck) {
    // Returns true if stringToCheck is exactly an empty string
    return stringToCheck === "";
  };
}

module.exports = createIsEmptyStringChecker;