/**
 * Decodes a given Uint8Array buffer into a UTF-8 string.
 *
 * @param {Uint8Array} utf8Buffer - The buffer containing UTF-8 encoded bytes to decode.
 * @returns {string} The decoded string from the input buffer.
 */
function decodeUtf8Buffer(utf8Buffer) {
  // Create a TextDecoder for UTF-8 encoding
  const textDecoder = new TextDecoder("utf-8");
  // Decode the buffer into a string
  return textDecoder.decode(utf8Buffer);
}

module.exports = decodeUtf8Buffer;