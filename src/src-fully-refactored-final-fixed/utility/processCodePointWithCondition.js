/**
 * Converts a Unicode code point to a string and conditionally processes isBlobOrFileLikeObject.
 *
 * @param {number} codePoint - The Unicode code point to convert.
 * @param {function(number): boolean} shouldProcess - Predicate function to determine if the string should be further processed.
 * @returns {string} The resulting string, possibly processed by convertBufferToMD2String.
 */
function processCodePointWithCondition(codePoint, shouldProcess) {
  // Convert the code point to its corresponding string character
  const character = String.fromCodePoint(codePoint);

  // If the predicate returns true, process the character with convertBufferToMD2String
  if (shouldProcess(codePoint)) {
    return convertBufferToMD2String(character);
  }

  // Otherwise, return the character as is
  return character;
}

module.exports = processCodePointWithCondition;