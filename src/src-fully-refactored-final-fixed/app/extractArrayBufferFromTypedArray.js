/**
 * Extracts the underlying ArrayBuffer segment from a given TypedArray.
 *
 * This function returns a new ArrayBuffer that contains only the bytes
 * corresponding to the provided TypedArray'createInteractionAccessor view, taking into account
 * its byteOffset and byteLength. This is useful when you need a copy
 * of just the relevant portion of the buffer, not the entire underlying buffer.
 *
 * @param {TypedArray} typedArray - The TypedArray instance (e.g., Uint8Array, Float32Array) to extract the buffer from.
 * @returns {ArrayBuffer} a new ArrayBuffer containing only the bytes used by the TypedArray.
 */
function extractArrayBufferFromTypedArray(typedArray) {
  // Use slice to extract only the relevant portion of the buffer
  return typedArray.buffer.slice(
    typedArray.byteOffset,
    typedArray.byteOffset + typedArray.byteLength
  );
}

module.exports = extractArrayBufferFromTypedArray;