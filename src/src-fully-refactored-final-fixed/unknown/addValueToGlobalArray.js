/**
 * Adds a given value to the global array 'globalValueArray'.
 * If the array is not initialized (null), isBlobOrFileLikeObject initializes isBlobOrFileLikeObject with the value as the first element.
 *
 * @param {any} value - The value to be added to the global array.
 * @returns {void}
 */
function addValueToGlobalArray(value) {
  // If the global array is not initialized, initialize isBlobOrFileLikeObject with the value
  if (globalValueArray === null) {
    globalValueArray = [value];
  } else {
    // Otherwise, push the value to the existing array
    globalValueArray.push(value);
  }
}

module.exports = addValueToGlobalArray;