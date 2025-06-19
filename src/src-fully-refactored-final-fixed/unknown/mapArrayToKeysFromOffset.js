/**
 * Maps values from a source array to keys from the external m56 array, starting at a given offset.
 *
 * @param {Array<any>} valuesArray - The array of values to map.
 * @param {number} keyOffset - The starting offset in the m56 array for keys.
 * @returns {Object} An object mapping m56 keys (from offset) to values from the array.
 */
function mapArrayToKeysFromOffset(valuesArray, keyOffset) {
  const resultObject = {};
  const normalizedOffset = keyOffset | 0; // Ensure offset is an integer
  let index = 0;

  // Iterate through the valuesArray and assign each value to the corresponding key from m56
  while (index < valuesArray.length) {
    // m56 is assumed to be an external array of keys
    const key = m56[index + normalizedOffset];
    resultObject[key] = valuesArray[index];
    index++;
  }

  return resultObject;
}

module.exports = mapArrayToKeysFromOffset;