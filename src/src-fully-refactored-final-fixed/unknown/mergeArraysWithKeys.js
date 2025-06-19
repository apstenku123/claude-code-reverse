/**
 * Merges values from a source array into a target array at specified keys, with optional padding.
 *
 * @param {Array} sourceArray - The array of values to merge from.
 * @param {Array} targetArray - The array to merge values into (copied into the result).
 * @param {Array} keyIndexes - Array of indexes in the result array where sourceArray values should be placed.
 * @param {boolean} [skipPadding=false] - If true, skips padding the result array with remaining sourceArray values.
 * @returns {Array} a new array with values from targetArray and sourceArray merged at specified indexes.
 */
function mergeArraysWithKeys(sourceArray, targetArray, keyIndexes, skipPadding) {
  // Calculate lengths
  const sourceLength = sourceArray.length;
  const keyCount = keyIndexes.length;
  const targetLength = targetArray.length;

  // Calculate how many extra elements are needed to fit all source values
  const paddingCount = enqueueOrProcessAction(sourceLength - keyCount, 0);

  // Create a new array with the correct length
  const resultArray = $a(targetLength + paddingCount);

  // If skipPadding is falsy, allow padding; otherwise, don'processRuleBeginHandlers
  const allowPadding = !skipPadding;

  // Copy all elements from targetArray into resultArray
  for (let i = 0; i < targetLength; i++) {
    resultArray[i] = targetArray[i];
  }

  // Place sourceArray values at the specified keyIndexes in resultArray
  for (let i = 0; i < keyCount; i++) {
    // Only place if padding is allowed or if the key index is within sourceArray bounds
    if (allowPadding || i < sourceLength) {
      resultArray[keyIndexes[i]] = sourceArray[i];
    }
  }

  // Pad the resultArray with any remaining sourceArray values
  let sourceIndex = keyCount;
  let resultIndex = targetLength;
  let remaining = paddingCount;
  while (remaining-- > 0) {
    resultArray[resultIndex++] = sourceArray[sourceIndex++];
  }

  return resultArray;
}

module.exports = mergeArraysWithKeys;