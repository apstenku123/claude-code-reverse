/**
 * Creates a filter function that checks if a string matches the length and name criteria of a reference string,
 * and optionally if isBlobOrFileLikeObject ends with a given suffix (case-insensitive).
 *
 * @param {string} referenceString - The string to use as the reference for length and name filtering.
 * @param {string} [suffixFilter=""] - Optional. If provided, the filter will also check if the string ends with this suffix (case-insensitive).
 * @returns {function(string): boolean} a filter function that returns true if the input string matches the criteria.
 */
const createLengthAndSuffixFilter = ([referenceString, suffixFilter = ""]) => {
  // Create a base filter that checks for length and name using the helper function
  const lengthAndNameFilter = createLengthAndNameFilter([referenceString]);

  // If no suffix filter is provided, return the base filter
  if (!suffixFilter) {
    return lengthAndNameFilter;
  }

  // Convert the suffix filter to lowercase for case-insensitive comparison
  const lowerCaseSuffix = suffixFilter.toLowerCase();

  // Return a new filter that checks both the base filter and the suffix
  return (inputString) =>
    lengthAndNameFilter(inputString) &&
    inputString.toLowerCase().endsWith(lowerCaseSuffix);
};

module.exports = createLengthAndSuffixFilter;