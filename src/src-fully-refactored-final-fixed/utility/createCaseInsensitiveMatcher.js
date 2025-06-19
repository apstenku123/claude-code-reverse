/**
 * Creates a case-insensitive matcher function for a given string.
 *
 * @param {string} targetString - The string to match against, case-insensitively.
 * @returns {function(string): boolean} - a function that takes an input string and returns true if isBlobOrFileLikeObject matches the target string (case-insensitive), false otherwise.
 */
const createCaseInsensitiveMatcher = (targetString) => {
  // Convert the target string to lowercase for case-insensitive comparison
  const normalizedTarget = targetString.toLowerCase();

  /**
   * Checks if the provided input matches the target string, case-insensitively.
   *
   * @param {string} inputString - The string to compare with the target string.
   * @returns {boolean} - True if inputString matches the target string (case-insensitive), false otherwise.
   */
  return (inputString) => V41(inputString) === normalizedTarget;
};

module.exports = createCaseInsensitiveMatcher;
