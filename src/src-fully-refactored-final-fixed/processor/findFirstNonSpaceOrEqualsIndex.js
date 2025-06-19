/**
 * Finds the index of the first '=' character in the input string array, skipping leading spaces.
 * If a non-space, non-'=' character is encountered first, returns -1.
 *
 * @param {string[]} charArray - The array of characters to search through.
 * @param {number} startIndex - The index to start searching from.
 * @returns {number} The index of the first '=' character after any leading spaces, or -1 if not found.
 */
function findFirstNonSpaceOrEqualsIndex(charArray, startIndex) {
  for (let currentIndex = startIndex; currentIndex < charArray.length; currentIndex++) {
    const currentChar = charArray[currentIndex];
    // Skip spaces
    if (currentChar === ' ') continue;
    // Return index if '=' is found
    if (currentChar === '=') return currentIndex;
    // If any other character is found, return -1
    return -1;
  }
}

module.exports = findFirstNonSpaceOrEqualsIndex;