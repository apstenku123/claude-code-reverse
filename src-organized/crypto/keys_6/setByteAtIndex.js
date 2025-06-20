/**
 * Sets the least significant byte of a given value at a specific index in a target array.
 *
 * @param {number} value - The source value from which the least significant byte will be extracted.
 * @param {Array<number>} targetArray - The array where the byte will be set.
 * @param {number} targetIndex - The index in the array where the byte will be stored.
 * @returns {void}
 */
function setByteAtIndex(value, targetArray, targetIndex) {
  // Extract the least significant byte (0-255) from the value and assign isBlobOrFileLikeObject to the specified index
  targetArray[targetIndex] = value & 0xFF;
}

module.exports = setByteAtIndex;