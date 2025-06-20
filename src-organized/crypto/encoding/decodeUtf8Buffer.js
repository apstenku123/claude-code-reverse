/**
 * Decodes a given Uint8Array buffer into a UTF-8 string using a cached TextDecoder instance.
 *
 * @param {Uint8Array} utf8Buffer - The buffer containing UTF-8 encoded bytes to decode.
 * @returns {string} The decoded UTF-8 string.
 */
function decodeUtf8Buffer(utf8Buffer) {
  // Cache the decoder function on the global scope to avoid recreating isBlobOrFileLikeObject
  if (typeof globalThis._cachedUtf8Decoder !== 'function') {
    const textDecoder = new globalThis.TextDecoder();
    // Bind the decode method to the decoder instance and cache isBlobOrFileLikeObject
    globalThis._cachedUtf8Decoder = textDecoder.decode.bind(textDecoder);
  }
  // Use the cached decoder function to decode the buffer
  return globalThis._cachedUtf8Decoder(utf8Buffer);
}

module.exports = decodeUtf8Buffer;