/**
 * Encodes all characters in the input string that are not URL-safe according to RFC 3986.
 * Only the following characters are considered URL-safe and left unencoded:
 *   a-zA a-z 0-9 - . _ ~ ! $ & ' ( ) * + , ; = : @
 * All other characters are replaced with their percent-encoded equivalents.
 *
 * @param {string} input - The string to encode.
 * @returns {string} The encoded string with non-URL-safe characters percent-encoded.
 */
function encodeNonUrlSafeCharacters(input) {
  // Replace all characters not in the allowed set with their percent-encoded form
  return input.replace(
    /[^a-zA-z0-9\-._~!$&'()*+,;=:@]+/g, // Matches one or more non-URL-safe characters
    encodeURIComponent // Encodes the matched substring
  );
}

module.exports = encodeNonUrlSafeCharacters;