/**
 * Encodes all characters in the input string that are not URI-safe using encodeURIComponent.
 * URI-safe characters are: a-zA, a-z, 0-9, '-', '.', '_', '~', '!', '$', '&', '\'', '(', ')', '*', '+', ',', ';', '=', ':', '@'.
 *
 * @param {string} inputString - The string to encode.
 * @returns {string} The encoded string with non-URI-safe characters percent-encoded.
 */
function encodeNonUriSafeCharacters(inputString) {
  // Replace all characters that are not in the allowed URI set with their percent-encoded equivalents
  return inputString.replace(
    /[^a-zA-z0-9\-._~!$&'()*+,;=:@]+/g,
    encodeURIComponent
  );
}

module.exports = encodeNonUriSafeCharacters;