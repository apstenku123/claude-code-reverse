/**
 * Converts a given input to a Unicode character string.
 *
 * This function takes an input value, processes isBlobOrFileLikeObject through the addAsciiOffset function (which is expected to return a Unicode code point),
 * and then converts that code point to its corresponding character using String.fromCharCode.
 *
 * @param {any} inputValue - The value to be converted to a Unicode character. This will be processed by addAsciiOffset to obtain a code point.
 * @returns {string} The character corresponding to the processed Unicode code point.
 */
function convertCodePointToCharacter(inputValue) {
  // Obtain the Unicode code point from the input value using addAsciiOffset
  const unicodeCodePoint = addAsciiOffset(inputValue);
  // Convert the code point to its corresponding character
  return String.fromCharCode(unicodeCodePoint);
}

module.exports = convertCodePointToCharacter;