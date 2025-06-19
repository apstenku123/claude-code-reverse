/**
 * Creates a filter function that checks if a given string has the same length as the reference string
 * and is not "." or ".." (commonly used to filter directory entries).
 *
 * @param {string} referenceString - The string whose length will be used for comparison.
 * @returns {function(string): boolean} - a predicate function that returns true if the input string
 *   has the same length as the reference string and is not "." or "..".
 */
const createLengthAndDotFilter = (referenceString) => {
  const referenceLength = referenceString.length;

  /**
   * Checks if the candidate string matches the reference length and is not "." or "..".
   * @param {string} candidate - The string to check.
   * @returns {boolean} - True if candidate matches the criteria, false otherwise.
   */
  return (candidate) => {
    // Check for length equality and exclude "." and ".." (common directory entries)
    return candidate.length === referenceLength && candidate !== "." && candidate !== "..";
  };
};

module.exports = createLengthAndDotFilter;
