/**
 * Finds the index of the nearest space character to the given position in a string.
 *
 * If the character at the given index is a space, returns that index. Otherwise,
 * searches up to three positions forward or backward (depending on the direction)
 * for the nearest space character and returns its index. If no space is found,
 * returns the original index.
 *
 * @param {string} text - The string to search within.
 * @param {number} startIndex - The index from which to start the search.
 * @param {boolean} searchForward - If true, searches forward; if false, searches backward.
 * @returns {number} The index of the nearest space character, or the original index if none found.
 */
function findNearestSpaceIndex(text, startIndex, searchForward) {
  // If the character at the starting index is a space, return immediately
  if (text.charAt(startIndex) === " ") {
    return startIndex;
  }

  // Determine search direction: 1 for forward, -1 for backward
  const direction = searchForward ? 1 : -1;

  // Search up to 3 positions in the specified direction
  for (let offset = 0; offset <= 3; offset++) {
    const currentIndex = startIndex + offset * direction;
    // Check if the character at the current index is a space
    if (text.charAt(currentIndex) === " ") {
      return currentIndex;
    }
  }

  // If no space character is found, return the original index
  return startIndex;
}

module.exports = findNearestSpaceIndex;