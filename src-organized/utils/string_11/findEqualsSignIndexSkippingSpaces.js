/**
 * Searches for the index of the first '=' character in the input string,
 * starting from the given index, skipping any spaces. Returns the index
 * of '=' if found (after skipping spaces), or -1 if the next non-space
 * character is not '=' or if the end of the string is reached.
 *
 * @param {string} inputString - The string to search within.
 * @param {number} startIndex - The index to start searching from.
 * @returns {number} The index of the first '=' character after skipping spaces, or -1 if not found.
 */
function findEqualsSignIndexSkippingSpaces(inputString, startIndex) {
  for (; startIndex < inputString.length; startIndex++) {
    const currentChar = inputString[startIndex];
    // Skip spaces
    if (currentChar === ' ') continue;
    // If the first non-space character is '=', return its index
    if (currentChar === '=') return startIndex;
    // If the first non-space character is not '=', return -1
    return -1;
  }
}

module.exports = findEqualsSignIndexSkippingSpaces;