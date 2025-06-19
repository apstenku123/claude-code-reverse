/**
 * Checks if the target array matches a section of the source array starting at a given position.
 *
 * @param {Array<any>} sourceArray - The array to search within.
 * @param {Array<any>} targetArray - The array to match against a section of the source array.
 * @param {{ position: number }} options - An object containing the starting position for the match in the source array.
 * @returns {boolean} True if the target array matches the source array at the specified position, false otherwise.
 */
function doesArrayMatchAtPosition(sourceArray, targetArray, options) {
  // If the source array is shorter than the target array, matching is impossible
  if (sourceArray.length < targetArray.length) {
    return false;
  }

  // Check each element of the target array against the corresponding element in the source array
  for (let index = 0; index < targetArray.length; index++) {
    // If any element does not match, return false immediately
    if (targetArray[index] !== sourceArray[options.position + index]) {
      return false;
    }
  }

  // All elements matched
  return true;
}

module.exports = doesArrayMatchAtPosition;