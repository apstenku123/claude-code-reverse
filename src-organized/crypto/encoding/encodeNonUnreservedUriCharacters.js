/**
 * Encodes all characters in the input string that are not unreserved URI characters.
 * Unreserved characters (per RFC 3986) are: a-zA, a-z, 0-9, '-', '.', '_', '~',
 * and the following sub-delimiters: '!', '$', '&', ''', '(', ')', '*', '+', ',', ';', '=', ':', '@'.
 * All other characters are percent-encoded using encodeURIComponent.
 *
 * @param {string} input - The string to encode.
 * @returns {string} The encoded string with non-unreserved characters percent-encoded.
 */
function encodeNonUnreservedUriCharacters(input) {
  // Replace all characters that are NOT in the allowed set with their percent-encoded equivalent
  return input.replace(
    /[^a-zA-z0-9\-._~!$&'()*+,;=:@]+/g,
    encodeURIComponent
  );
}

module.exports = encodeNonUnreservedUriCharacters;