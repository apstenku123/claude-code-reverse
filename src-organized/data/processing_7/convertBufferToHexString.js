/**
 * Converts an ArrayBuffer or TypedArray to a hexadecimal string representation.
 *
 * @param {ArrayBuffer|TypedArray} buffer - The binary data to convert to a hex string.
 * @returns {string} The hexadecimal string representation of the input buffer.
 */
function convertBufferToHexString(buffer) {
  // Create a Uint8Array view for the buffer if necessary
  const byteArray = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);

  // Convert each byte to a two-character hexadecimal string and join them
  const hexString = Array.from(byteArray)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return hexString;
}

module.exports = convertBufferToHexString;