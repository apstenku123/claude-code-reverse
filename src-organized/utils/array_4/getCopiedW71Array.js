/**
 * Returns a shallow copy of the global W71 array.
 *
 * @returns {Array<any>} a new array containing the elements of W71.
 */
function getCopiedW71Array() {
  // Create and return a shallow copy of the W71 array
  return [...W71];
}

module.exports = getCopiedW71Array;