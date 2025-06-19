/**
 * Encodes a URI string and replaces percent-encoded sequences using a custom regular expression.
 * If encoding fails (e.g., due to malformed input), returns null.
 *
 * @param {string} uriString - The URI string to encode and process.
 * @returns {string|null} The encoded and processed URI string, or null if encoding fails.
 */
function encodeUriWithPercentDecodeReplacement(uriString) {
  try {
    // Encode the URI and replace percent-encoded sequences using the provided regex
    const encodedUri = encodeURI(uriString).replace(gD.percentDecode, "%");
    return encodedUri;
  } catch (error) {
    // If encoding fails (e.g., malformed URI), return null
    return null;
  }
}

module.exports = encodeUriWithPercentDecodeReplacement;