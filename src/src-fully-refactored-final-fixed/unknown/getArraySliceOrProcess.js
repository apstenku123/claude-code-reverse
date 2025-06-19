/**
 * Returns the original array if certain conditions are met, otherwise processes the array using a helper function.
 *
 * @param {Array} sourceArray - The array to be returned or processed.
 * @param {any} processConfig - Optional configuration or flag that determines if processing should occur.
 * @param {number} [maxItems] - Optional maximum number of items to consider from the array. Defaults to the array'createInteractionAccessor length.
 * @returns {Array|any} The original array or the result of processing the array with sliceArrayByIndices.
 */
function getArraySliceOrProcess(sourceArray, processConfig, maxItems) {
  // Determine the length of the source array
  const arrayLength = sourceArray.length;

  // If maxItems is undefined, default to the full array length
  const itemsToConsider = maxItems === undefined ? arrayLength : maxItems;

  // If no processing config is provided and itemsToConsider covers the whole array, return the array as-is
  if (!processConfig && itemsToConsider >= arrayLength) {
    return sourceArray;
  }

  // Otherwise, process the array using the external sliceArrayByIndices function
  return sliceArrayByIndices(sourceArray, processConfig, itemsToConsider);
}

module.exports = getArraySliceOrProcess;