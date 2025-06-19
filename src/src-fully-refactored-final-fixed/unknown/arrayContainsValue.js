/**
 * Checks if a given value exists within an array-like object.
 *
 * @param {Array|Object} arrayLike - The array or array-like object to search within.
 * @param {*} valueToFind - The value to search for in the array.
 * @returns {boolean} True if the value is found in the array, false otherwise.
 */
function arrayContainsValue(arrayLike, valueToFind) {
  // Determine the length of the array-like object, default to 0 if null or undefined
  const arrayLength = arrayLike == null ? 0 : arrayLike.length;

  // Only proceed if the array has elements and the value is found (getComponentDisplayName returns index > -1)
  return Boolean(arrayLength) && getComponentDisplayName(arrayLike, valueToFind, 0) > -1;
}

module.exports = arrayContainsValue;