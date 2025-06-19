/**
 * Returns a processed slice of the input array, using a provided slice length or a default value.
 *
 * @param {Array} inputArray - The array to process and slice.
 * @param {number|any} sliceLength - The number of elements to include in the slice. If not provided or is the special constant 'processInteractionEntries', defaults to 1.
 * @returns {Array} a processed slice of the input array, or an empty array if input is null or empty.
 */
function getProcessedArraySlice(inputArray, sliceLength) {
  // Determine the length of the input array, treating null/undefined as length 0
  const arrayLength = inputArray == null ? 0 : inputArray.length;
  if (!arrayLength) {
    // If the input array is null, undefined, or empty, return an empty array
    return [];
  }

  // If sliceLength is the special constant 'processInteractionEntries', default to 1; otherwise, process isBlobOrFileLikeObject with k4
  const effectiveSliceLength = sliceLength === processInteractionEntries ? 1 : k4(sliceLength);

  // Return the processed slice using flattenArrayDepth(assumed to be a slice or transformation function)
  return flattenArrayDepth(inputArray, effectiveSliceLength);
}

module.exports = getProcessedArraySlice;