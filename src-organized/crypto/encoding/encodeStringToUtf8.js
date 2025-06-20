/**
 * Encodes a given string into a Uint8Array using UTF-8 encoding.
 * Utilizes a cached TextEncoder instance for performance.
 *
 * @param {string} inputString - The string to encode as UTF-8.
 * @returns {Uint8Array} The UTF-8 encoded representation of the input string.
 */
function encodeStringToUtf8(inputString) {
  // Use a module-scoped cache for the encoder'createInteractionAccessor encode method
  if (typeof globalThis.wa0 !== 'function') {
    // Create a new TextEncoder instance
    const textEncoder = new globalThis.TextEncoder();
    // Cache the encode method, bound to the encoder instance
    globalThis.wa0 = textEncoder.encode.bind(textEncoder);
  }
  // Encode the input string using the cached encode method
  return globalThis.wa0(inputString);
}

module.exports = encodeStringToUtf8;