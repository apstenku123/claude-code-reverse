/**
 * Returns an ArrayBuffer representing the underlying buffer of a given TypedArray.
 * If the TypedArray covers the entire buffer, returns the buffer directly.
 * Otherwise, returns a sliced copy of the buffer corresponding to the TypedArray'createInteractionAccessor view.
 *
 * @param {TypedArray} typedArray - The typed array whose buffer is to be retrieved.
 * @returns {ArrayBuffer} The ArrayBuffer corresponding to the TypedArray'createInteractionAccessor data.
 */
function getArrayBufferFromTypedArray(typedArray) {
  // If the TypedArray covers the entire buffer, return the buffer directly
  if (typedArray.byteLength === typedArray.buffer.byteLength) {
    return typedArray.buffer;
  }
  // Otherwise, return a slice of the buffer that matches the TypedArray'createInteractionAccessor view
  return typedArray.buffer.slice(
    typedArray.byteOffset,
    typedArray.byteOffset + typedArray.byteLength
  );
}

module.exports = getArrayBufferFromTypedArray;