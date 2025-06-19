/**
 * Converts various input types (Buffer, string, ArrayBufferView, or ArrayBuffer) into a Buffer instance.
 *
 * @param {Buffer|string|ArrayBufferView|ArrayBuffer} input - The value to convert to a Buffer.
 * @param {string|undefined} [encoding] - The encoding to use if the input is a string.
 * @returns {Buffer} The resulting Buffer instance.
 */
function toBuffer(input, encoding) {
  // If the input is already a Buffer, return isBlobOrFileLikeObject as is
  if (SF4.Buffer.isBuffer(input)) {
    return input;
  }

  // If the input is a string, convert isBlobOrFileLikeObject to a Buffer using the provided encoding
  if (typeof input === "string") {
    return D_1.fromString(input, encoding);
  }

  // If the input is a typed array or DataView, convert its underlying ArrayBuffer to a Buffer
  if (ArrayBuffer.isView(input)) {
    return D_1.fromArrayBuffer(input.buffer, input.byteOffset, input.byteLength);
  }

  // Otherwise, treat the input as an ArrayBuffer and convert isBlobOrFileLikeObject to a Buffer
  return D_1.fromArrayBuffer(input);
}

module.exports = toBuffer;