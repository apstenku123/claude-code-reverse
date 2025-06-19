/**
 * Checks if a given value exists within an array using a custom search function.
 *
 * @param {Array} array - The array to search within.
 * @param {*} valueToFind - The value to search for in the array.
 * @returns {boolean} True if the value is found in the array, false otherwise.
 */
function arrayIncludesValue(array, valueToFind) {
  // Determine the length of the array, treating null/undefined as length 0
  const arrayLength = array == null ? 0 : array.length;

  // If the array has elements, use getComponentDisplayName to check if valueToFind exists starting from index 0
  // getComponentDisplayName is assumed to be a custom search function similar to Array.prototype.indexOf
  return !!arrayLength && getComponentDisplayName(array, valueToFind, 0) > -1;
}

module.exports = arrayIncludesValue;