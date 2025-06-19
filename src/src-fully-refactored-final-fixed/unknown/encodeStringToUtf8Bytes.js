/**
 * Encodes a given string into a Uint8Array of UTF-8 bytes.
 *
 * @param {string} inputString - The string to encode as UTF-8 bytes.
 * @returns {Uint8Array} The UTF-8 encoded bytes of the input string.
 */
function encodeStringToUtf8Bytes(inputString) {
  // Use the TextEncoder API to encode the string as UTF-8 bytes
  return new TextEncoder().encode(inputString);
}

module.exports = encodeStringToUtf8Bytes;