/**
 * Converts a hexadecimal string into a Uint8Array.
 *
 * @param {string} hexString - The hexadecimal string to convert.
 * @returns {Uint8Array} a Uint8Array representing the binary data of the input hex string.
 */
function hexStringToUint8Array(hexString) {
  // Create a Buffer from the hexadecimal string
  const buffer = Buffer.from(hexString, "hex");
  // Create a Uint8Array view over the buffer'createInteractionAccessor underlying ArrayBuffer
  // This ensures the Uint8Array represents the same binary data as the Buffer
  return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength / Uint8Array.BYTES_PER_ELEMENT);
}

module.exports = hexStringToUint8Array;