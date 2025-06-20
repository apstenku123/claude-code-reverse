/**
 * Searches for the index of the first '=' character in the input string, starting from the given index.
 * Skips over any space characters. If a non-space, non-'=' character is found, returns -1.
 *
 * @param {string} inputString - The string to search within.
 * @param {number} startIndex - The index to start searching from.
 * @returns {number} The index of the first '=' character found after skipping spaces, or -1 if not found.
 */
function findEqualsSignIndex(inputString, startIndex) {
  for (; startIndex < inputString.length; startIndex++) {
    const currentChar = inputString[startIndex];
    // Skip spaces
    if (currentChar === ' ') continue;
    // Return index if '=' is found
    if (currentChar === '=') return startIndex;
    // If any other character is found, return -1
    return -1;
  }
}

module.exports = findEqualsSignIndex;