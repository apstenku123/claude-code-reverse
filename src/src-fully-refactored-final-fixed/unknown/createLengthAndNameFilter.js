/**
 * Creates a filter function that checks if a given string:
 *   1. Has the same length as the reference string
 *   2. Is not equal to '.' or '..'
 *
 * @param {string} referenceString - The string whose length will be used for comparison
 * @returns {(candidate: string) => boolean} - a filter function for string arrays
 */
function createLengthAndNameFilter(referenceString) {
  const referenceLength = referenceString.length;
  /**
   * Checks if the candidate string matches the reference length and is not '.' or '..'.
   * @param {string} candidate - The string to check
   * @returns {boolean} True if candidate matches criteria, false otherwise
   */
  return function(candidate) {
    // Check if candidate has the same length and is not '.' or '..'
    return (
      candidate.length === referenceLength &&
      candidate !== '.' &&
      candidate !== '..'
    );
  };
}

module.exports = createLengthAndNameFilter;
