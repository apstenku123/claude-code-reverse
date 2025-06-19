/**
 * Creates a new instance of the same TypedArray as the source, optionally processing its buffer.
 *
 * If shouldProcessBuffer is true, the sourceArray'createInteractionAccessor buffer is processed using the _y function before cloning.
 * Otherwise, the buffer is used as-is. The new TypedArray instance preserves the byteOffset and length of the original.
 *
 * @param {TypedArray} sourceArray - The typed array to clone.
 * @param {boolean} shouldProcessBuffer - Whether to process the buffer using _y before cloning.
 * @returns {TypedArray} a new instance of the same TypedArray, sharing the same byteOffset and length, with the (optionally processed) buffer.
 */
function cloneTypedArrayWithOptionalBufferProcessing(sourceArray, shouldProcessBuffer) {
  // If shouldProcessBuffer is true, process the buffer with _y; otherwise, use the buffer as-is
  const bufferToUse = shouldProcessBuffer ? _y(sourceArray.buffer) : sourceArray.buffer;
  // Create a new instance of the same TypedArray, with the same byteOffset and length
  return new sourceArray.constructor(bufferToUse, sourceArray.byteOffset, sourceArray.length);
}

module.exports = cloneTypedArrayWithOptionalBufferProcessing;