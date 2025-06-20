/**
 * Searches for the first occurrence of a line break (LF or CR) in a byte array, starting from a given index.
 *
 * @param {number[]} byteArray - The array of bytes to search through.
 * @param {number} [startIndex=0] - The index to start searching from. Defaults to 0 if not provided.
 * @returns {null | { preceding: number, index: number, carriage: boolean }}
 *   Returns an object with:
 *     - preceding: the index of the line break character found
 *     - index: the next index after the line break
 *     - carriage: true if the character is a carriage return (CR), false if line feed (LF)
 *   Returns null if no line break is found.
 */
function findLineBreakInArray(byteArray, startIndex = 0) {
  for (let currentIndex = startIndex; currentIndex < byteArray.length; currentIndex++) {
    // Check for Line Feed (LF, ASCII 10)
    if (byteArray[currentIndex] === 10) {
      return {
        preceding: currentIndex,
        index: currentIndex + 1,
        carriage: false // LF is not a carriage return
      };
    }
    // Check for Carriage Return (CR, ASCII 13)
    if (byteArray[currentIndex] === 13) {
      return {
        preceding: currentIndex,
        index: currentIndex + 1,
        carriage: true // CR is a carriage return
      };
    }
  }
  // No line break found
  return null;
}

module.exports = findLineBreakInArray;