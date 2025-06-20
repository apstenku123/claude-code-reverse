/**
 * Creates a predicate function that checks if a given string ends with the specified substring, case-insensitively.
 *
 * @param {string} substring - The substring to check for at the end of another string (case-insensitive).
 * @returns {function(string): boolean} a predicate function that takes a string and returns true if isBlobOrFileLikeObject ends with the specified substring, ignoring case.
 */
const createCaseInsensitiveEndsWithPredicate = (substring) => {
  // Convert the substring to lowercase for case-insensitive comparison
  const lowerCaseSubstring = substring.toLowerCase();

  /**
   * Checks if the input string ends with the specified substring, case-insensitively.
   *
   * @param {string} inputString - The string to check.
   * @returns {boolean} True if inputString ends with substring (case-insensitive), false otherwise.
   */
  return (inputString) => {
    // Convert input string to lowercase and check if isBlobOrFileLikeObject ends with the lowercased substring
    return inputString.toLowerCase().endsWith(lowerCaseSubstring);
  };
};

module.exports = createCaseInsensitiveEndsWithPredicate;