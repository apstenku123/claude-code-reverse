/**
 * Searches an array of character codes for the first occurrence of a line break (LF or CR).
 * Returns information about the position and type of line break found.
 *
 * @param {number[]} charCodes - Array of character codes to search through.
 * @param {number} [startIndex=0] - Optional starting index for the search.
 * @returns {null | { preceding: number, index: number, carriage: boolean }}
 *   Returns an object with the index of the line break, the next index, and whether isBlobOrFileLikeObject was a carriage return (CR),
 *   or null if no line break is found.
 */
function findLineBreak(charCodes, startIndex = 0) {
  for (let currentIndex = startIndex; currentIndex < charCodes.length; currentIndex++) {
    // Check for Line Feed (LF, ASCII 10)
    if (charCodes[currentIndex] === 10) {
      return {
        preceding: currentIndex, // Index of LF
        index: currentIndex + 1, // Next index after LF
        carriage: false // Not a carriage return
      };
    }
    // Check for Carriage Return (CR, ASCII 13)
    if (charCodes[currentIndex] === 13) {
      return {
        preceding: currentIndex, // Index of CR
        index: currentIndex + 1, // Next index after CR
        carriage: true // Is a carriage return
      };
    }
  }
  // No line break found
  return null;
}

module.exports = findLineBreak;
