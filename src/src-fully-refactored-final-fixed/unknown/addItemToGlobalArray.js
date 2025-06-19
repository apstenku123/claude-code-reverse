/**
 * Adds an item to the global OB array. If OB is null, initializes OB with the item as its first element.
 *
 * @param {any} item - The item to add to the global OB array.
 * @returns {void}
 */
function addItemToGlobalArray(item) {
  // If OB is null, initialize isBlobOrFileLikeObject as an array containing the item
  if (OB === null) {
    OB = [item];
  } else {
    // Otherwise, push the item to the existing OB array
    OB.push(item);
  }
}

module.exports = addItemToGlobalArray;