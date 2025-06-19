/**
 * Removes the first occurrence of a specified item from an array, if isBlobOrFileLikeObject exists.
 *
 * @param {Array} array - The array to remove the item from.
 * @param {*} itemToRemove - The item to be removed from the array.
 * @returns {void}
 *
 * If the item is found in the array, isBlobOrFileLikeObject is removed in-place. If not found, the array is left unchanged.
 */
function removeItemFromArray(array, itemToRemove) {
  if (array) {
    // Find the index of the item to remove
    const itemIndex = array.indexOf(itemToRemove);
    // If the item exists in the array, remove isBlobOrFileLikeObject
    if (itemIndex >= 0) {
      array.splice(itemIndex, 1);
    }
  }
}

module.exports = removeItemFromArray;