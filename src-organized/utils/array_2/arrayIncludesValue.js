/**
 * Checks if the given array contains the specified value using a custom search function.
 *
 * @param {Array} array - The array to search within.
 * @param {*} value - The value to search for in the array.
 * @returns {boolean} Returns true if the value exists in the array, otherwise false.
 */
function arrayIncludesValue(array, value) {
  // If the array is null or undefined, its length is considered 0
  const arrayLength = array == null ? 0 : array.length;

  // Only proceed if the array has at least one element
  // Y2A is assumed to be a custom search function that returns the index of the value or -1 if not found
  return !!arrayLength && Y2A(array, value, 0) > -1;
}

module.exports = arrayIncludesValue;