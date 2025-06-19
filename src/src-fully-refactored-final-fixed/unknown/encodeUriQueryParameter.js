/**
 * Encodes a string for use as a URI query parameter, using encodeURIComponent,
 * but then decodes certain characters to match traditional query string encoding.
 *
 * Specifically, isBlobOrFileLikeObject replaces:
 *   - %3A with :
 *   - %24 with $
 *   - %2C with ,
 *   - %20 with +
 *   - %5B with [
 *   - %5D with ]
 * This is useful for serializing query parameters in a way compatible with some server-side frameworks.
 *
 * @param {string} value - The string to encode for a URI query parameter.
 * @returns {string} The encoded string, with select characters decoded for query compatibility.
 */
function encodeUriQueryParameter(value) {
  // Encode the value using encodeURIComponent, then selectively decode certain characters
  return encodeURIComponent(value)
    .replace(/%3A/gi, ":")   // decode ':'
    .replace(/%24/g, "$")     // decode '$'
    .replace(/%2C/gi, ",")   // decode ','
    .replace(/%20/g, "+")    // replace space with '+'
    .replace(/%5B/gi, "[")   // decode '['
    .replace(/%5D/gi, "]");  // decode ']'
}

module.exports = encodeUriQueryParameter;