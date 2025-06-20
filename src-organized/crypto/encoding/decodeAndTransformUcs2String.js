/**
 * Decodes a UCS-2 encoded string and applies a transformation to each code point.
 *
 * If the input is invalid (as determined by No6), returns a predefined constant (U6).
 * Otherwise, decodes the string using Zd.ucs2.decode, then applies the Nj transformation
 * to each code point with the isNonPrintableAsciiCode parameter, concatenating the results into a new string.
 *
 * @param {string} ucs2EncodedString - The UCS-2 encoded string to decode and transform.
 * @returns {string|any} The transformed string, or U6 if input is invalid.
 */
function decodeAndTransformUcs2String(ucs2EncodedString) {
  // Check if the input string is invalid; return U6 constant if so
  if (No6(ucs2EncodedString)) return U6;

  let transformedString = "";
  // Decode the UCS-2 string into an array of code points
  const codePoints = Zd.ucs2.decode(ucs2EncodedString);

  // Transform each code point using Nj and concatenate the result
  for (let index = 0; index < codePoints.length; ++index) {
    transformedString += Nj(codePoints[index], isNonPrintableAsciiCode);
  }

  return transformedString;
}

module.exports = decodeAndTransformUcs2String;