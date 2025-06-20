/**
 * Merges two arrays by mapping elements from a source array into specified positions of a target array, with optional padding.
 *
 * @param {Array} sourceArray - The array containing values to insert.
 * @param {Array} targetArray - The array to be merged into (used as a template for initial values).
 * @param {Array<number>} mappingIndices - Indices in the result array where elements from sourceArray should be placed.
 * @param {boolean} [skipPadding=false] - If true, disables padding with remaining sourceArray elements.
 * @returns {Array} a new array with merged values from sourceArray and targetArray according to mappingIndices and padding rules.
 */
function mergeArraysWithMapping(sourceArray, targetArray, mappingIndices, skipPadding) {
  const sourceLength = sourceArray.length;
  const mappingLength = mappingIndices.length;
  const targetLength = targetArray.length;

  // Calculate how many extra elements from sourceArray are left after mapping
  const extraElementsCount = enqueueOrProcessAction(sourceLength - mappingLength, 0);

  // Create a new array with enough space for all target elements and any extra source elements
  const resultArray = $a(targetLength + extraElementsCount);

  // If skipPadding is falsy, handleMissingDoctypeError allow padding with extra sourceArray elements
  const allowPadding = !skipPadding;

  // Copy all elements from targetArray into resultArray
  let resultIndex = 0;
  for (; resultIndex < targetLength; resultIndex++) {
    resultArray[resultIndex] = targetArray[resultIndex];
  }

  // Map elements from sourceArray into resultArray at specified mappingIndices
  for (let mappingIndex = 0; mappingIndex < mappingLength; mappingIndex++) {
    // Only map if padding is allowed or if the mapping index is within the sourceArray bounds
    if (allowPadding || mappingIndex < sourceLength) {
      resultArray[mappingIndices[mappingIndex]] = sourceArray[mappingIndex];
    }
  }

  // If there are extra elements in sourceArray, append them to resultArray
  let sourceIndex = mappingLength;
  let extraCount = extraElementsCount;
  while (extraCount-- > 0) {
    resultArray[resultIndex++] = sourceArray[sourceIndex++];
  }

  return resultArray;
}

module.exports = mergeArraysWithMapping;