/**
 * Sets the least significant byte of the given value at the specified index in the target array.
 *
 * @param {number} value - The value whose least significant byte will be set in the array.
 * @param {Array|Uint8Array} targetArray - The array in which the byte value will be set.
 * @param {number} index - The index at which to set the byte value in the array.
 */
function setByteValueAtIndex(value, targetArray, index) {
  // Mask the value to get only the least significant 8 bits (1 byte)
  targetArray[index] = value & 0xFF;
}

module.exports = setByteValueAtIndex;