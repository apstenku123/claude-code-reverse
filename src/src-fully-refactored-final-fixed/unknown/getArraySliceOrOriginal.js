/**
 * Returns either the original array or a processed slice of isBlobOrFileLikeObject, depending on the provided parameters.
 *
 * If the config parameter is falsy and the requested slice length is greater than or equal to the array length,
 * the original array is returned. Otherwise, a helper function is called to process and return the sliced array.
 *
 * @param {Array} sourceArray - The array to be processed or returned.
 * @param {any} config - Optional configuration; if falsy and sliceLength >= array length, the original array is returned.
 * @param {number} [sliceLength] - Optional length for slicing; defaults to the length of sourceArray if not provided.
 * @returns {Array} The original array or a processed slice, depending on the parameters.
 */
function getArraySliceOrOriginal(sourceArray, config, sliceLength) {
  // Determine the length of the source array
  const arrayLength = sourceArray.length;

  // If sliceLength is undefined, default to the full array length
  const effectiveSliceLength = sliceLength === undefined ? arrayLength : sliceLength;

  // If config is falsy and requested slice length covers the whole array, return the original array
  if (!config && effectiveSliceLength >= arrayLength) {
    return sourceArray;
  }

  // Otherwise, delegate to the external sliceArrayByIndices function for processing
  return sliceArrayByIndices(sourceArray, config, effectiveSliceLength);
}

module.exports = getArraySliceOrOriginal;