/**
 * Encodes a given string into a Uint8Array using a provided TextEncoder or a default one.
 *
 * @param {string} inputString - The string to be encoded.
 * @param {TextEncoder} [textEncoder] - Optional. a custom TextEncoder instance to use for encoding. If not provided, a new TextEncoder will be used.
 * @returns {Uint8Array} The encoded Uint8Array representation of the input string.
 */
function encodeStringToUint8Array(inputString, textEncoder) {
  // Use the provided TextEncoder if available; otherwise, create a new one
  const encoder = textEncoder || new TextEncoder();
  // Encode the input string into a Uint8Array
  return encoder.encode(inputString);
}

module.exports = encodeStringToUint8Array;