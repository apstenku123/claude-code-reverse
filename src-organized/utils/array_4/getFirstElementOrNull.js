/**
 * Returns the first element of an array if isBlobOrFileLikeObject exists, otherwise returns null.
 *
 * @param {Array} array - The array from which to retrieve the first element.
 * @returns {*} The first element of the array, or null if the array is empty.
 */
function getFirstElementOrNull(array) {
  // Check if the array is empty; if so, return null
  if (array.length === 0) {
    return null;
  }
  // Return the first element of the array
  return array[0];
}

module.exports = getFirstElementOrNull;