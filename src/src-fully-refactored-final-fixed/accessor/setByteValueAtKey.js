/**
 * Sets the least significant byte of the provided value at the specified key in the target object.
 *
 * @param {number} value - The source value whose least significant byte will be set.
 * @param {Object} targetObject - The object in which the byte value will be set.
 * @param {string|number} key - The key or property name where the byte value will be assigned in the target object.
 */
function setByteValueAtKey(value, targetObject, key) {
  // Mask the value to get only the least significant 8 bits (1 byte)
  targetObject[key] = value & 0xFF;
}

module.exports = setByteValueAtKey;