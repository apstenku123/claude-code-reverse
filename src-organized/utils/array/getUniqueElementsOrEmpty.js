/**
 * Returns a new array containing the first occurrence of each unique value from the input array,
 * where uniqueness is determined by an optional accessor function. If the input is null, undefined,
 * or an empty array, returns an empty array.
 *
 * @param {Array} inputArray - The array to process for unique elements.
 * @returns {Array} a new array with unique elements, or an empty array if input is falsy or empty.
 */
function getUniqueElementsOrEmpty(inputArray) {
  // Check if inputArray is truthy and has a length greater than zero
  if (inputArray && inputArray.length) {
    // Delegate to getUniqueByAccessor to filter unique elements
    return getUniqueByAccessor(inputArray);
  }
  // Return an empty array if input is falsy or empty
  return [];
}

module.exports = getUniqueElementsOrEmpty;