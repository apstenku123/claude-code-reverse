/**
 * Decodes a UCS-2 encoded string and applies a transformation to each code point.
 *
 * @param {string} inputString - The UCS-2 encoded string to decode and transform.
 * @returns {string} The transformed string, or a special value if input is invalid.
 */
function decodeUcs2AndTransform(inputString) {
  // If input is invalid according to No6, return the special value U6
  if (No6(inputString)) return U6;

  let transformedString = "";
  // Decode the input string into an array of code points using UCS-2 decoding
  const codePoints = Zd.ucs2.decode(inputString);

  // Transform each code point using Nj and concatenate the result
  for (let index = 0; index < codePoints.length; ++index) {
    transformedString += Nj(codePoints[index], isNonPrintableAsciiCode);
  }
  return transformedString;
}

module.exports = decodeUcs2AndTransform;