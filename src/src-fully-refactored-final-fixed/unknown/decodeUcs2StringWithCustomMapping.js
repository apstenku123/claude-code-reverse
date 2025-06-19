/**
 * Decodes a UCS-2 encoded string and applies a custom mapping function to each code point.
 *
 * @param {string} inputString - The UCS-2 encoded string to decode and map.
 * @returns {string} The resulting string after decoding and mapping each code point.
 */
function decodeUcs2StringWithCustomMapping(inputString) {
  // If input is considered 'empty' or invalid by No6, return the default value U6
  if (No6(inputString)) return U6;

  let mappedString = "";
  // Decode the UCS-2 encoded string into an array of code points
  const codePoints = Zd.ucs2.decode(inputString);

  // Map each code point using the Nj function and concatenate the results
  for (let codePointIndex = 0; codePointIndex < codePoints.length; ++codePointIndex) {
    mappedString += Nj(codePoints[codePointIndex], isNonPrintableAsciiCode);
  }

  return mappedString;
}

module.exports = decodeUcs2StringWithCustomMapping;