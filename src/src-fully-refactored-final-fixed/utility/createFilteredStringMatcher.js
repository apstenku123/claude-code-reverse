/**
 * Creates a filter function that matches strings based on length and optional suffix.
 *
 * If only a reference string is provided, the returned filter checks if a candidate string
 * has the same length as the reference and is not '.' or '..'.
 * If a suffix is provided, the filter also checks if the candidate string ends with the given suffix (case-insensitive).
 *
 * @param {string} referenceString - The string to use as a reference for length comparison.
 * @param {string} [suffixFilter=""] - Optional. The suffix to match at the end of candidate strings (case-insensitive).
 * @returns {function(string): boolean} a filter function that returns true if the candidate string matches the criteria.
 */
const createFilteredStringMatcher = (referenceString, suffixFilter = "") => {
  // Create a base filter that checks for same length and not '.' or '..'
  const lengthAndDotFilter = createLengthAndDotFilter([referenceString]);

  // If no suffix filter is provided, return the base filter
  if (!suffixFilter) {
    return lengthAndDotFilter;
  }

  // Normalize the suffix filter to lower case for case-insensitive comparison
  const normalizedSuffix = suffixFilter.toLowerCase();

  // Return a filter that checks both the base filter and the suffix match
  return candidateString =>
    lengthAndDotFilter(candidateString) &&
    candidateString.toLowerCase().endsWith(normalizedSuffix);
};

module.exports = createFilteredStringMatcher;