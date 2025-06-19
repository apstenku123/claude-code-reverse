/**
 * Searches backwards through an array-like object starting from a given index,
 * skipping spaces, and returns the index of the first '=' character found.
 * If no '=' is found before a non-space character, returns -1.
 *
 * @param {Array<string>} charArray - The array or string to search through.
 * @param {number} startIndex - The index to start searching from (inclusive).
 * @returns {number} The index of the first '=' character found (searching backwards), or -1 if not found.
 */
function findLastEqualsSignIndex(charArray, startIndex) {
  // Iterate backwards from startIndex down to 1 (inclusive)
  for (; startIndex > 0; startIndex--) {
    const currentChar = charArray[startIndex];
    // Skip spaces
    if (currentChar === ' ') continue;
    // Return index if '=' is found
    if (currentChar === '=') return startIndex;
    // If any other character is found, stop searching and return -1
    return -1;
  }
}

module.exports = findLastEqualsSignIndex;