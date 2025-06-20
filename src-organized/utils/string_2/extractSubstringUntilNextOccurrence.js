/**
 * Extracts a substring from the current position in the source string up to the next occurrence of a specified search string.
 * Updates the position property of the positionTracker object to reflect the new position after extraction.
 * If the search string is not found, returns the rest of the string from the current position and sets position to the end.
 *
 * @param {string} searchString - The string to search for in the source string.
 * @param {string} sourceString - The string from which to extract the substring.
 * @param {{ position: number }} positionTracker - An object tracking the current position in the source string.
 * @returns {string} The extracted substring from the previous position up to (but not including) the next occurrence of the search string, or the rest of the string if not found.
 */
function extractSubstringUntilNextOccurrence(searchString, sourceString, positionTracker) {
  // Find the index of the next occurrence of searchString in sourceString, starting from the current position
  const nextIndex = sourceString.indexOf(searchString, positionTracker.position);
  // Store the starting position for extraction
  const startPosition = positionTracker.position;

  // If searchString is not found, return the rest of the string and move position to the end
  if (nextIndex === -1) {
    positionTracker.position = sourceString.length;
    return sourceString.slice(startPosition);
  }

  // If found, update position to the found index and return the substring up to that point
  positionTracker.position = nextIndex;
  return sourceString.slice(startPosition, positionTracker.position);
}

module.exports = extractSubstringUntilNextOccurrence;