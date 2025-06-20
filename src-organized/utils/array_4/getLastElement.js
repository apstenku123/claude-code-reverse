/**
 * Retrieves the last element from an array-like object.
 *
 * @param {Array<any>} arrayLike - The array or array-like object to retrieve the last element from.
 * @returns {any} The last element of the array, or undefined if the array is empty.
 */
function getLastElement(arrayLike) {
  // Access the last element using the length property
  return arrayLike[arrayLike.length - 1];
}

module.exports = getLastElement;