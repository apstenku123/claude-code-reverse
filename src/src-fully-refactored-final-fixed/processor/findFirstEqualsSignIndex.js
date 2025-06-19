/**
 * Finds the index of the first '=' character in the input string, starting from the given index, skipping spaces.
 *
 * @param {string} inputString - The string to search through.
 * @param {number} startIndex - The index to start searching from.
 * @returns {number} The index of the first '=' character found after skipping spaces, or -1 if not found.
 */
function findFirstEqualsSignIndex(inputString, startIndex) {
  for (let currentIndex = startIndex; currentIndex < inputString.length; currentIndex++) {
    const currentChar = inputString[currentIndex];
    // Skip spaces
    if (currentChar === ' ') {
      continue;
    }
    // Return the index if '=' is found
    if (currentChar === '=') {
      return currentIndex;
    }
    // If any other character is found, return -1
    return -1;
  }
}

module.exports = findFirstEqualsSignIndex;