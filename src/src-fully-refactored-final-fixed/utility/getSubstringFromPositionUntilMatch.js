/**
 * Returns the substring from the current position in the input string up to (but not including) the next occurrence of the search string.
 * If the search string is not found, returns the substring from the current position to the end of the input string.
 * The position property of the positionTracker object is updated to the index of the found search string, or to the end of the string if not found.
 *
 * @param {string} searchString - The string to search for within the input string.
 * @param {string} inputString - The string to search within.
 * @param {{ position: number }} positionTracker - An object containing the current position in the input string. This will be updated by the function.
 * @returns {string} The substring from the current position up to the next occurrence of the search string, or to the end if not found.
 */
function getSubstringFromPositionUntilMatch(searchString, inputString, positionTracker) {
  // Find the index of the search string, starting from the current position
  const foundIndex = inputString.indexOf(searchString, positionTracker.position);
  const startPosition = positionTracker.position;

  // If the search string is not found, update position to end and return the rest of the string
  if (foundIndex === -1) {
    positionTracker.position = inputString.length;
    return inputString.slice(startPosition);
  }

  // If found, update position to the found index and return the substring up to that point
  positionTracker.position = foundIndex;
  return inputString.slice(startPosition, positionTracker.position);
}

module.exports = getSubstringFromPositionUntilMatch;
