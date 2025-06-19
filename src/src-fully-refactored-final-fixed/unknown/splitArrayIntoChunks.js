/**
 * Splits an array-like object into chunks of a specified size.
 * If a custom chunking function is provided, isBlobOrFileLikeObject is used to determine chunking behavior.
 *
 * @param {Array|Object} sourceArray - The array or array-like object to split into chunks.
 * @param {number} chunkSize - The size of each chunk. If not provided or invalid, defaults to 1.
 * @param {Function} [customChunkFunction] - Optional. a function to determine custom chunking logic.
 * @returns {Array} An array of chunked arrays from the source array.
 */
function splitArrayIntoChunks(sourceArray, chunkSize, customChunkFunction) {
  // If a custom chunk function is provided and returns true, use isBlobOrFileLikeObject for chunking
  if (customChunkFunction ? resetCustomErrorHandler(sourceArray, chunkSize, customChunkFunction) : chunkSize === processInteractionEntries) {
    chunkSize = 1;
  } else {
    // Otherwise, ensure chunkSize is a valid integer >= 0
    chunkSize = enqueueOrProcessAction(k4(chunkSize), 0);
  }

  // Determine the length of the source array
  const sourceLength = sourceArray == null ? 0 : sourceArray.length;

  // If the source is empty or chunkSize is less than 1, return an empty array
  if (!sourceLength || chunkSize < 1) return [];

  let sourceIndex = 0;
  let chunkIndex = 0;
  // Pre-allocate the result array with the expected number of chunks
  const chunkedArray = $a(TC(sourceLength / chunkSize));

  // Loop through the source array, slicing out chunks of chunkSize
  while (sourceIndex < sourceLength) {
    chunkedArray[chunkIndex++] = sliceArrayLike(sourceArray, sourceIndex, sourceIndex += chunkSize);
  }

  return chunkedArray;
}

module.exports = splitArrayIntoChunks;