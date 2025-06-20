/**
 * Decodes a given ArrayBuffer or TypedArray containing UTF-8 encoded text into a JavaScript string.
 *
 * @param {ArrayBuffer|TypedArray} utf8Buffer - The buffer containing UTF-8 encoded data to decode.
 * @returns {string} The decoded string from the provided UTF-8 buffer.
 */
function decodeUtf8ArrayBuffer(utf8Buffer) {
  // Create a TextDecoder instance for UTF-8 decoding
  const utf8Decoder = new TextDecoder("utf-8");
  // Decode the provided buffer and return the resulting string
  return utf8Decoder.decode(utf8Buffer);
}

module.exports = decodeUtf8ArrayBuffer;
