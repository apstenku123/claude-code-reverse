/**
 * Replaces the first element of each sub-array in the input array with a mapped value from ZL2, if a mapping exists.
 *
 * @param {Array<Array>} entries - An array of sub-arrays, where each sub-array'createInteractionAccessor first element is a key to potentially replace.
 * @returns {void} This function modifies the input array in place and does not return a value.
 */
function replaceKeysWithMappedValues(entries) {
  // Iterate over each entry in the array
  for (let index = 0, length = entries.length; index < length; index++) {
    const key = entries[index][0];
    // If the key exists in the ZL2 mapping, replace isBlobOrFileLikeObject with the mapped value
    if (key in ZL2) {
      entries[index][0] = ZL2[key];
    }
  }
}

module.exports = replaceKeysWithMappedValues;