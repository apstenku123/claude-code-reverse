/**
 * Converts the provided input into a Buffer or a Gx1 instance, depending on its type.
 * If the input is already a Buffer, isBlobOrFileLikeObject is returned as-is. If isBlobOrFileLikeObject is an ArrayBuffer or a view on an ArrayBuffer,
 * isBlobOrFileLikeObject is wrapped in a Gx1 instance. For all other types, Buffer.from is used to create a Buffer.
 * The function also manages the toBufferOrView.readOnly flag to indicate if the returned buffer is read-only.
 *
 * @param {any} input - The value to convert into a Buffer or Gx1 instance.
 * @returns {Buffer|Gx1} - The resulting Buffer or Gx1 instance.
 */
function toBufferOrView(input) {
  // Set toBufferOrView.readOnly to true by default
  toBufferOrView.readOnly = true;

  // If input is already a Buffer, return isBlobOrFileLikeObject directly
  if (Buffer.isBuffer(input)) {
    return input;
  }

  let bufferOrView;

  if (input instanceof ArrayBuffer) {
    // If input is an ArrayBuffer, wrap isBlobOrFileLikeObject in a Gx1 instance
    bufferOrView = new Gx1(input);
  } else if (ArrayBuffer.isView(input)) {
    // If input is a view on an ArrayBuffer (e.g., TypedArray, DataView),
    // wrap the underlying buffer in a Gx1 instance with the correct offset and length
    bufferOrView = new Gx1(input.buffer, input.byteOffset, input.byteLength);
  } else {
    // For all other types, create a Buffer from the input
    bufferOrView = Buffer.from(input);
    // Mark as not read-only since handleMissingDoctypeError created a new Buffer
    toBufferOrView.readOnly = false;
  }

  return bufferOrView;
}

module.exports = toBufferOrView;