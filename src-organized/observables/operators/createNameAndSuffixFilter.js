/**
 * Creates a filter function for strings based on length, name, and optional suffix.
 *
 * The returned filter checks if a given string:
 *   - Has the same length as the reference string
 *   - Is not '.' or '..'
 *   - (Optionally) ends with a specified suffix (case-insensitive)
 *
 * @param {string} referenceName - The reference string to compare length and name against.
 * @param {string} [suffixFilter=""] - Optional suffix to filter by (case-insensitive). If empty, no suffix filtering is applied.
 * @returns {function(string): boolean} a filter function that returns true if the input string matches the criteria.
 */
const createLengthAndNameFilter = require('./createLengthAndNameFilter');

function createNameAndSuffixFilter(referenceName, suffixFilter = "") {
  // Create a filter that checks for same length and not '.' or '..'
  const lengthAndNameFilter = createLengthAndNameFilter([referenceName]);

  // If no suffix filter is provided, return the basic filter
  if (!suffixFilter) {
    return lengthAndNameFilter;
  }

  // Normalize the suffix filter for case-insensitive comparison
  const normalizedSuffix = suffixFilter.toLowerCase();

  // Return a filter that checks both the base filter and the suffix
  return function (inputString) {
    // First, check the base filter
    if (!lengthAndNameFilter(inputString)) {
      return false;
    }
    // Then, check if the string ends with the specified suffix (case-insensitive)
    return inputString.toLowerCase().endsWith(normalizedSuffix);
  };
}

module.exports = createNameAndSuffixFilter;
