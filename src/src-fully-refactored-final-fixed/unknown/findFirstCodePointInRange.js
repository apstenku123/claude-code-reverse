/**
 * Finds the index of the first character in the input string whose Unicode code point
 * falls within the specified inclusive range [bk4, gk4].
 *
 * @param {string} inputString - The string to search through.
 * @returns {number} The index of the first character whose code point is within the range, or -1 if none found.
 */
function findFirstCodePointInRange(inputString) {
  // Iterate over each character in the string
  for (let charIndex = 0; charIndex < inputString.length; charIndex++) {
    // Get the Unicode code point at the current index
    const codePoint = inputString.codePointAt(charIndex);
    // Check if the code point is within the specified range
    if (codePoint >= bk4 && codePoint <= gk4) {
      return charIndex;
    }
  }
  // Return -1 if no character in the range is found
  return -1;
}

module.exports = findFirstCodePointInRange;