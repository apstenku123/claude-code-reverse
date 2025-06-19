/**
 * Extracts a substring from the input string starting at the current position up to the next occurrence of the search string.
 * If the search string is not found, returns the substring from the current position to the end of the input string.
 * Updates the position property of the positionTracker object to the index after the found substring or to the end of the string.
 *
 * @param {string} searchString - The substring to search for within the input string.
 * @param {string} inputString - The string to search within and extract the substring from.
 * @param {{ position: number }} positionTracker - An object containing the current position index. This will be updated.
 * @returns {string} The extracted substring from the current position up to (but not including) the found search string, or to the end if not found.
 */
function extractSubstringByPosition(searchString, inputString, positionTracker) {
  // Find the index of the searchString in inputString, starting from the current position
  const foundIndex = inputString.indexOf(searchString, positionTracker.position);
  // Store the starting position for slicing
  const startPosition = positionTracker.position;

  if (foundIndex === -1) {
    // If searchString is not found, update position to end and return the rest of the string
    positionTracker.position = inputString.length;
    return inputString.slice(startPosition);
  }
  // If found, update position to the found index and return the substring up to that point
  positionTracker.position = foundIndex;
  return inputString.slice(startPosition, positionTracker.position);
}

module.exports = extractSubstringByPosition;
