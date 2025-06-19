/**
 * Creates a new typed array instance that shares or copies the buffer from the source typed array.
 * If shouldCopyBuffer is true, the buffer is cloned using the external _y function; otherwise, the original buffer is used.
 *
 * @param {TypedArray} sourceTypedArray - The typed array to clone.
 * @param {boolean} shouldCopyBuffer - If true, clone the buffer; if false, use the original buffer.
 * @returns {TypedArray} a new typed array instance with the same constructor, buffer, byteOffset, and byteLength as the source.
 */
function cloneTypedArrayBuffer(sourceTypedArray, shouldCopyBuffer) {
  // Determine which buffer to use: clone or original
  const bufferToUse = shouldCopyBuffer ? _y(sourceTypedArray.buffer) : sourceTypedArray.buffer;
  // Create a new typed array instance with the same constructor and memory layout
  return new sourceTypedArray.constructor(bufferToUse, sourceTypedArray.byteOffset, sourceTypedArray.byteLength);
}

module.exports = cloneTypedArrayBuffer;