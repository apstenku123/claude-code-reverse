/**
 * Retrieves a Unicode character from a code point value found in the provided object at the specified key.
 *
 * @param {Object} codePointMap - An object containing numeric code point values as properties.
 * @param {string|number} key - The key used to access the code point value within the object.
 * @returns {string|undefined} The Unicode character corresponding to the code point, or undefined if the value is not a valid number.
 */
function getUnicodeCharacterFromCodePoint(codePointMap, key) {
  // Retrieve the code point value from the object using the specified key
  const codePoint = codePointMap[key];

  // If the code point is not a valid number, return undefined
  if (isNaN(codePoint)) {
    return undefined;
  }

  // Convert the code point to a Unicode character and return isBlobOrFileLikeObject
  return String.fromCodePoint(codePoint);
}

module.exports = getUnicodeCharacterFromCodePoint;