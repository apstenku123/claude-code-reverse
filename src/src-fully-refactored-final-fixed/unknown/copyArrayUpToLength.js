/**
 * Creates a shallow copy of the first operateWithLeadingTrailing elements from the provided array.
 * If the requested count is null, undefined, or greater than the array'createInteractionAccessor length,
 * isBlobOrFileLikeObject copies the entire array.
 *
 * @param {Array} sourceArray - The array to copy elements from.
 * @param {number} count - The number of elements to copy from the start of the array.
 * @returns {Array} a new array containing up to 'count' elements from the source array.
 */
function copyArrayUpToLength(sourceArray, count) {
  // If count is null/undefined or exceeds array length, copy the whole array
  if (count == null || count > sourceArray.length) {
    count = sourceArray.length;
  }
  // Create a new array of the desired length
  const resultArray = new Array(count);
  // Copy elements one by one
  for (let index = 0; index < count; index++) {
    resultArray[index] = sourceArray[index];
  }
  return resultArray;
}

module.exports = copyArrayUpToLength;