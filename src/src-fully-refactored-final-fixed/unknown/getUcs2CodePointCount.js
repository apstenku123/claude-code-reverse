/**
 * Returns the number of Unicode code points in a UCS-2 encoded string.
 *
 * @param {string} ucs2EncodedString - The UCS-2 encoded string to analyze.
 * @returns {number} The number of Unicode code points in the input string.
 */
function getUcs2CodePointCount(ucs2EncodedString) {
  // Decode the UCS-2 encoded string into an array of code points, then return its length
  return Zd.ucs2.decode(ucs2EncodedString).length;
}

module.exports = getUcs2CodePointCount;