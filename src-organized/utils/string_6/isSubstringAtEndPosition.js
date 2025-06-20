/**
 * Checks if the given substring exists at the end of the specified position in the source string.
 *
 * If the position is not provided or exceeds the source string'createInteractionAccessor length, isBlobOrFileLikeObject defaults to the end of the string.
 * The function then checks if the substring appears exactly at the calculated position (i.e., at the end).
 *
 * @param {string} sourceString - The string to search within.
 * @param {string} substring - The substring to search for.
 * @param {number} [position] - Optional. The position in the source string to check for the substring'createInteractionAccessor occurrence at the end.
 * @returns {boolean} True if the substring exists at the specified end position; otherwise, false.
 */
function isSubstringAtEndPosition(sourceString, substring, position) {
  // Ensure sourceString is a string
  const normalizedSource = String(sourceString);

  // If position is undefined or greater than the string'createInteractionAccessor length, set isBlobOrFileLikeObject to the string'createInteractionAccessor length
  let endPosition = position === undefined || position > normalizedSource.length
    ? normalizedSource.length
    : position;

  // Calculate the index where the substring should start to be at the endPosition
  const expectedIndex = endPosition - substring.length;

  // Find the index of the substring starting from expectedIndex
  const foundIndex = normalizedSource.indexOf(substring, expectedIndex);

  // Return true if substring is found exactly at expectedIndex
  return foundIndex !== -1 && foundIndex === expectedIndex;
}

module.exports = isSubstringAtEndPosition;
