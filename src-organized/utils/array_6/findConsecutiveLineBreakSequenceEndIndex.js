/**
 * Searches an array of character codes for specific consecutive line break sequences (\n\n, \r\r, or \r\n\r\n)
 * and returns the index immediately after the end of the first such sequence found.
 *
 * @param {number[]} charCodes - An array of character codes to search through.
 * @returns {number} The index immediately after the detected line break sequence, or -1 if none found.
 */
function findConsecutiveLineBreakSequenceEndIndex(charCodes) {
  // Iterate through the array, stopping before the last element to avoid out-of-bounds access
  for (let currentIndex = 0; currentIndex < charCodes.length - 1; currentIndex++) {
    // Check for two consecutive LF (\n, char code 10)
    if (charCodes[currentIndex] === 10 && charCodes[currentIndex + 1] === 10) {
      return currentIndex + 2;
    }
    // Check for two consecutive CR (\r, char code 13)
    if (charCodes[currentIndex] === 13 && charCodes[currentIndex + 1] === 13) {
      return currentIndex + 2;
    }
    // Check for CRLFCRLF (\r\n\r\n, char codes 13,10,13,10)
    if (
      charCodes[currentIndex] === 13 &&
      charCodes[currentIndex + 1] === 10 &&
      currentIndex + 3 < charCodes.length &&
      charCodes[currentIndex + 2] === 13 &&
      charCodes[currentIndex + 3] === 10
    ) {
      return currentIndex + 4;
    }
  }
  // Return -1 if no sequence is found
  return -1;
}

module.exports = findConsecutiveLineBreakSequenceEndIndex;