/**
 * Checks if a given substring appears at the end of a source string, or at a specified position from the end.
 *
 * @param {string} sourceString - The string to search within.
 * @param {string} searchString - The substring to search for.
 * @param {number} [position] - Optional. The position from the start of the string where the search should end. If not provided or greater than the string length, uses the string'createInteractionAccessor length.
 * @returns {boolean} True if the searchString is found at the calculated position in sourceString; otherwise, false.
 */
function doesSubstringEndAtPosition(sourceString, searchString, position) {
  // Ensure sourceString is a string
  const normalizedSource = String(sourceString);

  // If position is undefined or greater than the string length, use the string'createInteractionAccessor length
  let effectivePosition = position;
  if (effectivePosition === undefined || effectivePosition > normalizedSource.length) {
    effectivePosition = normalizedSource.length;
  }

  // Calculate the position where searchString should start to end at effectivePosition
  const searchStart = effectivePosition - searchString.length;

  // Find the index of searchString starting at searchStart
  const foundIndex = normalizedSource.indexOf(searchString, searchStart);

  // Check if searchString is found exactly at searchStart
  return foundIndex !== -1 && foundIndex === searchStart;
}

module.exports = doesSubstringEndAtPosition;
