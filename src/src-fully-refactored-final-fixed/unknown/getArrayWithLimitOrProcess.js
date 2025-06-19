/**
 * Returns the input array as-is if no processing is needed, or processes isBlobOrFileLikeObject with sliceArrayByIndices otherwise.
 *
 * If the 'limit' parameter is not provided, isBlobOrFileLikeObject defaults to the length of the input array.
 * If 'shouldProcess' is falsy and 'limit' is greater than or equal to the array length, returns the array as-is.
 * Otherwise, processes the array using the sliceArrayByIndices function.
 *
 * @param {Array} inputArray - The array to potentially process or return as-is.
 * @param {boolean} shouldProcess - Determines if the array should be processed. If falsy, may return the array as-is.
 * @param {number} [limit] - Optional limit for processing; defaults to inputArray.length if not provided.
 * @returns {Array|any} The original array or the result of processing isBlobOrFileLikeObject with sliceArrayByIndices.
 */
function getArrayWithLimitOrProcess(inputArray, shouldProcess, limit) {
  // Default 'limit' to the length of the input array if not provided
  const arrayLength = inputArray.length;
  const effectiveLimit = (limit === undefined) ? arrayLength : limit;

  // If shouldProcess is falsy and limit is greater than or equal to array length, return the array as-is
  if (!shouldProcess && effectiveLimit >= arrayLength) {
    return inputArray;
  }

  // Otherwise, process the array using sliceArrayByIndices
  return sliceArrayByIndices(inputArray, shouldProcess, effectiveLimit);
}

module.exports = getArrayWithLimitOrProcess;