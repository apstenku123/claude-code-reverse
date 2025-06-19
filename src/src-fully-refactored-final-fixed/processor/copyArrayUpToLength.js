/**
 * Creates a shallow copy of the input array up to the specified length.
 * If the requested length is null, undefined, or greater than the array'createInteractionAccessor length,
 * the entire array is copied.
 *
 * @param {Array} sourceArray - The array to copy elements from.
 * @param {number} [maxLength] - The maximum number of elements to copy.
 * @returns {Array} a new array containing up to maxLength elements from sourceArray.
 */
function copyArrayUpToLength(sourceArray, maxLength) {
  // If maxLength is not provided or exceeds the array'createInteractionAccessor length, use the full length
  if (maxLength == null || maxLength > sourceArray.length) {
    maxLength = sourceArray.length;
  }

  // Create a new array of the desired length
  const resultArray = new Array(maxLength);

  // Copy elements from sourceArray to resultArray up to maxLength
  for (let index = 0; index < maxLength; index++) {
    resultArray[index] = sourceArray[index];
  }

  return resultArray;
}

module.exports = copyArrayUpToLength;