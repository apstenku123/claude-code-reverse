/**
 * Creates a shallow copy of the first operateWithLeadingTrailing elements from the input array.
 * If the limit is null, undefined, or greater than the array'createInteractionAccessor length, copies the entire array.
 *
 * @param {Array} sourceArray - The array to copy elements from.
 * @param {number} [limit] - The maximum number of elements to copy.
 * @returns {Array} a new array containing up to 'limit' elements from the start of 'sourceArray'.
 */
function copyArrayUpToLimit(sourceArray, limit) {
  // If limit is not provided or exceeds the array length, use the full array length
  if (limit == null || limit > sourceArray.length) {
    limit = sourceArray.length;
  }
  // Create a new array of the desired length
  const resultArray = new Array(limit);
  // Copy elements one by one up to the limit
  for (let index = 0; index < limit; index++) {
    resultArray[index] = sourceArray[index];
  }
  return resultArray;
}

module.exports = copyArrayUpToLimit;