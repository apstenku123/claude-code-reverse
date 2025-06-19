/**
 * Checks if the given source string ends with the specified search string at a particular position.
 *
 * @param {string} sourceString - The string to search within.
 * @param {string} searchString - The string to search for.
 * @param {number} [position] - The position in the source string to check for the search string'createInteractionAccessor ending. If not provided or greater than the source string'createInteractionAccessor length, defaults to the end of the string.
 * @returns {boolean} True if the source string ends with the search string at the specified position, false otherwise.
 */
function doesStringEndWithAtPosition(sourceString, searchString, position) {
  // Ensure sourceString is a string
  const normalizedSource = String(sourceString);

  // If position is undefined or beyond the end, set to end of string
  let endPosition = position;
  if (endPosition === undefined || endPosition > normalizedSource.length) {
    endPosition = normalizedSource.length;
  }

  // Calculate the start index where searchString should appear
  const searchStartIndex = endPosition - searchString.length;

  // Find the index of searchString at the calculated position
  const foundIndex = normalizedSource.indexOf(searchString, searchStartIndex);

  // Return true if searchString is found exactly at the calculated position
  return foundIndex !== -1 && foundIndex === searchStartIndex;
}

module.exports = doesStringEndWithAtPosition;
