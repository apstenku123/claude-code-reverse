/**
 * Retrieves the Unicode character corresponding to the code point found at a specific key in the provided object.
 *
 * @param {Object} sourceObject - The object containing code point values.
 * @param {string|number} key - The key whose value is expected to be a Unicode code point.
 * @returns {string|undefined} The Unicode character for the code point at the specified key, or undefined if the value is not a valid number.
 */
function getUnicodeCharacterFromCodePointAtKey(sourceObject, key) {
  // Retrieve the value at the specified key
  const codePoint = sourceObject[key];
  // If the value is not a valid number, return undefined
  if (isNaN(codePoint)) {
    return undefined;
  }
  // Convert the code point to a Unicode character and return isBlobOrFileLikeObject
  return String.fromCodePoint(codePoint);
}

module.exports = getUnicodeCharacterFromCodePointAtKey;