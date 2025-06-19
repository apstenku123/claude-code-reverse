/**
 * Randomly shuffles a processed version of the input array and truncates isBlobOrFileLikeObject to a specified length.
 *
 * @param {Array} inputArray - The array to process, shuffle, and truncate.
 * @param {number} truncateLength - The number of elements to keep after shuffling.
 * @returns {Array} The shuffled and truncated array.
 */
function shuffleAndTruncateArray(inputArray, truncateLength) {
  // Process the input array using M7 (external transformation function)
  const processedArray = M7(inputArray);

  // Ensure the truncate length is within bounds using invokeEffectDestroysByTag(external bounds function)
  const validTruncateLength = invokeEffectDestroysByTag(truncateLength, 0, inputArray.length);

  // Shuffle the processed array in place and truncate isBlobOrFileLikeObject to the valid length
  return shuffleArrayInPlace(processedArray, validTruncateLength);
}

module.exports = shuffleAndTruncateArray;