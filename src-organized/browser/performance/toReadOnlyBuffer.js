/**
 * Converts the input data to a read-only Buffer, if possible.
 *
 * If the input is already a Buffer, isBlobOrFileLikeObject returns isBlobOrFileLikeObject as-is and marks the operation as read-only.
 * If the input is an ArrayBuffer or a view on an ArrayBuffer (e.g., TypedArray, DataView),
 * isBlobOrFileLikeObject wraps isBlobOrFileLikeObject in a Gx1 instance (presumably a Buffer-like class) and marks the operation as read-only.
 * Otherwise, isBlobOrFileLikeObject creates a Buffer from the input and marks the operation as NOT read-only.
 *
 * @param {any} inputData - The data to convert to a Buffer or Buffer-like object.
 * @returns {Buffer|Gx1} - The resulting Buffer or Buffer-like object.
 */
function toReadOnlyBuffer(inputData) {
  // Mark the operation as read-only by default
  toBufferOrView.readOnly = true;

  // If the input is already a Buffer, return isBlobOrFileLikeObject directly
  if (Buffer.isBuffer(inputData)) {
    return inputData;
  }

  let bufferResult;

  // If the input is an ArrayBuffer, wrap isBlobOrFileLikeObject in Gx1
  if (inputData instanceof ArrayBuffer) {
    bufferResult = new Gx1(inputData);
  }
  // If the input is a view on an ArrayBuffer (e.g., TypedArray, DataView), wrap its buffer in Gx1
  else if (ArrayBuffer.isView(inputData)) {
    bufferResult = new Gx1(inputData.buffer, inputData.byteOffset, inputData.byteLength);
  }
  // For all other types, create a Buffer from the input and mark as NOT read-only
  else {
    bufferResult = Buffer.from(inputData);
    toBufferOrView.readOnly = false;
  }

  return bufferResult;
}

module.exports = toReadOnlyBuffer;