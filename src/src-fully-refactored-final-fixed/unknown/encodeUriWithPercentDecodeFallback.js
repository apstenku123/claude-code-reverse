/**
 * Encodes a URI string and replaces any percent-encoded sequences matching a specific pattern with '%'.
 * If encoding fails (e.g., due to malformed input), returns null.
 *
 * @param {string} uriString - The URI string to encode and process.
 * @returns {string|null} The processed URI string, or null if encoding fails.
 */
function encodeUriWithPercentDecodeFallback(uriString) {
  try {
    // Encode the URI and replace all matches of the percentDecode pattern with '%'
    const encodedUri = encodeURI(uriString).replace(gD.percentDecode, "%");
    return encodedUri;
  } catch (error) {
    // If encoding fails, return null
    return null;
  }
}

module.exports = encodeUriWithPercentDecodeFallback;