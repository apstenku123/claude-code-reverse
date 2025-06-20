/**
 * Creates a new instance of the given TypedArray, optionally processing its buffer before cloning.
 *
 * @param {TypedArray} sourceTypedArray - The typed array to clone.
 * @param {boolean} shouldProcessBuffer - If true, processes the buffer using _y before cloning.
 * @returns {TypedArray} a new instance of the same TypedArray type, sharing the same byteOffset and byteLength, with the (optionally processed) buffer.
 */
function cloneTypedArrayWithOptionalProcessing(sourceTypedArray, shouldProcessBuffer) {
  // Determine which buffer to use: processed or original
  const bufferToUse = shouldProcessBuffer ? _y(sourceTypedArray.buffer) : sourceTypedArray.buffer;
  // Create a new instance of the same TypedArray, using the chosen buffer, offset, and length
  return new sourceTypedArray.constructor(bufferToUse, sourceTypedArray.byteOffset, sourceTypedArray.byteLength);
}

module.exports = cloneTypedArrayWithOptionalProcessing;