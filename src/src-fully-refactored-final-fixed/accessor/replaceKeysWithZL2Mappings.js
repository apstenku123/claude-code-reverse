/**
 * Replaces the first element of each sub-array in the input array with its mapped value from ZL2, if a mapping exists.
 *
 * @param {Array<Array<string>>} arrayOfKeyValuePairs - An array of arrays, where each sub-array'createInteractionAccessor first element is a key to potentially replace.
 * @returns {void} This function modifies the input array in place and does not return anything.
 */
function replaceKeysWithZL2Mappings(arrayOfKeyValuePairs) {
  // Iterate through each sub-array in the input array
  for (let index = 0, length = arrayOfKeyValuePairs.length; index < length; index++) {
    const key = arrayOfKeyValuePairs[index][0];
    // If the key exists in ZL2, replace isBlobOrFileLikeObject with the mapped value
    if (key in ZL2) {
      arrayOfKeyValuePairs[index][0] = ZL2[key];
    }
  }
}

module.exports = replaceKeysWithZL2Mappings;