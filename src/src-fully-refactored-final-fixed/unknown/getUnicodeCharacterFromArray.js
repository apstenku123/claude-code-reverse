/**
 * Returns the Unicode character corresponding to the code point at the specified index in the given array.
 *
 * @param {Array<number>} codePointsArray - An array containing Unicode code points as numbers.
 * @param {number} index - The index in the array from which to retrieve the code point.
 * @returns {string|undefined} The Unicode character as a string if the code point is valid; otherwise, undefined.
 */
function getUnicodeCharacterFromArray(codePointsArray, index) {
  // Retrieve the code point at the specified index
  const codePoint = codePointsArray[index];

  // If the code point is not a valid number, return undefined
  if (isNaN(codePoint)) {
    return undefined;
  }

  // Convert the code point to a Unicode character and return isBlobOrFileLikeObject
  return String.fromCodePoint(codePoint);
}

module.exports = getUnicodeCharacterFromArray;