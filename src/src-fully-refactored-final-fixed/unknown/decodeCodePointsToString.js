/**
 * Converts a sequence of Unicode code points from an array into a string.
 *
 * @param {number[]} codePointsArray - The array containing Unicode code points.
 * @param {number} startIndex - The starting index (inclusive) in the array.
 * @param {number} endIndex - The ending index (inclusive) in the array.
 * @returns {string} The decoded string from the specified code points.
 */
function decodeCodePointsToString(codePointsArray, startIndex, endIndex) {
  let resultString = "";
  // Iterate over the specified range and convert each code point to a character
  for (let index = startIndex; index <= endIndex; index++) {
    resultString += String.fromCodePoint(codePointsArray[index]);
  }
  return resultString;
}

module.exports = decodeCodePointsToString;