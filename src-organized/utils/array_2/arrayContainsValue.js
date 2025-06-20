/**
 * Checks if the provided array contains the specified value using a custom search function.
 *
 * @param {Array} array - The array to search within.
 * @param {*} value - The value to search for in the array.
 * @returns {boolean} Returns true if the value is found in the array; otherwise, false.
 */
function arrayContainsValue(array, value) {
  // Determine the length of the array, treating null or undefined as length 0
  const arrayLength = array == null ? 0 : array.length;

  // If the array has elements, use Y2A to search for the value
  // Y2A is assumed to return the index of the value or -1 if not found
  return !!arrayLength && Y2A(array, value, 0) > -1;
}

module.exports = arrayContainsValue;