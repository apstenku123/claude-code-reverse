/**
 * Returns an ArrayBuffer representing the data in the provided TypedArray.
 * If the TypedArray covers the entire underlying buffer, returns the buffer directly.
 * Otherwise, returns a sliced ArrayBuffer containing only the relevant portion.
 *
 * @param {TypedArray} typedArray - The typed array whose buffer should be extracted.
 * @returns {ArrayBuffer} The ArrayBuffer containing the data from the typed array.
 */
function getArrayBufferFromTypedArray(typedArray) {
  // If the typed array covers the entire buffer, return the buffer directly
  if (typedArray.length === typedArray.buffer.byteLength) {
    return typedArray.buffer;
  }
  // Otherwise, return a slice of the buffer that matches the typed array'createInteractionAccessor data
  return typedArray.buffer.slice(
    typedArray.byteOffset,
    typedArray.byteOffset + typedArray.length
  );
}

module.exports = getArrayBufferFromTypedArray;