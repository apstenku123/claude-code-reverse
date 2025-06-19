/**
 * Extracts a substring from the given text, starting at the current position in the positionTracker object,
 * up to the next occurrence of the searchString. If the searchString is not found, returns the remainder of the text.
 * The positionTracker.position is updated to the found index or set to the end of the text if not found.
 *
 * @param {string} searchString - The string to search for in the text.
 * @param {string} text - The text to search within and extract the substring from.
 * @param {{ position: number }} positionTracker - An object containing the current position index. This will be updated.
 * @returns {string} The substring from the current position up to (but not including) the next occurrence of searchString, or the remainder of the text if searchString is not found.
 */
function extractSubstringFromPosition(searchString, text, positionTracker) {
  // Find the index of searchString in text, starting from the current position
  const foundIndex = text.indexOf(searchString, positionTracker.position);
  // Store the original position to use as the start of the slice
  const startPosition = positionTracker.position;

  if (foundIndex === -1) {
    // If searchString is not found, update position to end of text and return the remainder
    positionTracker.position = text.length;
    return text.slice(startPosition);
  }
  // If found, update position to the found index and return the substring up to that point
  positionTracker.position = foundIndex;
  return text.slice(startPosition, positionTracker.position);
}

module.exports = extractSubstringFromPosition;