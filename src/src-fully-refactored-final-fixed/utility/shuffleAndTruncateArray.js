/**
 * Generates an array from the input, shuffles isBlobOrFileLikeObject in place up to a specified count, and truncates isBlobOrFileLikeObject to that count.
 *
 * @param {any} source - The input value to be converted into an array using Kq.
 * @param {number} count - The number of elements to keep after shuffling.
 * @returns {Array} The shuffled and truncated array.
 */
function shuffleAndTruncateArray(source, count) {
  // Convert the input source to an array using Kq
  const array = Kq(source);
  // Ensure count is within array bounds using invokeEffectDestroysByTag
  const validCount = invokeEffectDestroysByTag(count, 0, array.length);
  // Shuffle the array in place up to validCount, then truncate
  return shuffleArrayInPlace(array, validCount);
}

module.exports = shuffleAndTruncateArray;