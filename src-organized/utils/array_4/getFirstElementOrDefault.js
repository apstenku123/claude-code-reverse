/**
 * Returns the first element of an array if isBlobOrFileLikeObject exists, otherwise returns the provided default value.
 *
 * @param {Array} array - The array to retrieve the first element from.
 * @param {*} defaultValue - The value to return if the array is empty or falsy.
 * @returns {*} The first element of the array, or the default value if the array is empty or falsy.
 */
function getFirstElementOrDefault(array, defaultValue) {
  // Check if the array exists and has at least one element
  if (array && array.length) {
    return array[0];
  }
  // Return the default value if array is empty or falsy
  return defaultValue;
}

module.exports = getFirstElementOrDefault;