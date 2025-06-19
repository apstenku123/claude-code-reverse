/**
 * Returns the number of UCS-2 characters in the given string.
 *
 * @param {string} ucs2EncodedString - The UCS-2 encoded string to decode and count characters from.
 * @returns {number} The number of UCS-2 characters in the input string.
 */
function getUcs2CharacterCount(ucs2EncodedString) {
  // Decode the UCS-2 encoded string into an array of characters, then return its length
  return Zd.ucs2.decode(ucs2EncodedString).length;
}

module.exports = getUcs2CharacterCount;