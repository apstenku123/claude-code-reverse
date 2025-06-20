/**
 * Checks if the targetArray matches a subarray of sourceArray starting at the specified position.
 *
 * @param {Array} sourceArray - The array to search within.
 * @param {Array} targetArray - The array to match as a subarray.
 * @param {Object} options - Options object containing the starting position.
 * @param {number} options.position - The index in sourceArray to start matching.
 * @returns {boolean} True if targetArray matches sourceArray at the given position, false otherwise.
 */
function doesSubarrayMatchAtPosition(sourceArray, targetArray, options) {
  // If the source array is shorter than the target, matching is impossible
  if (sourceArray.length < targetArray.length) {
    return false;
  }

  // Check each element of targetArray against the corresponding element in sourceArray
  for (let index = 0; index < targetArray.length; index++) {
    if (targetArray[index] !== sourceArray[options.position + index]) {
      return false;
    }
  }

  // All elements matched
  return true;
}

module.exports = doesSubarrayMatchAtPosition;
