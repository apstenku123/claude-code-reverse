/**
 * Replaces the first element of each interaction entry with a mapped value from ZL2 if a mapping exists.
 *
 * @param {Array<Array>} interactionEntries - An array of interaction entries, where each entry is an array and the first element is a key to be mapped.
 * @returns {void} This function modifies the input array in place and does not return a value.
 */
function replaceInteractionKeysWithMappedValues(interactionEntries) {
  // Iterate over each interaction entry in the array
  for (let entryIndex = 0, totalEntries = interactionEntries.length; entryIndex < totalEntries; entryIndex++) {
    const interactionEntry = interactionEntries[entryIndex];
    const originalKey = interactionEntry[0];
    // If the key exists in the ZL2 mapping, replace isBlobOrFileLikeObject with the mapped value
    if (originalKey in ZL2) {
      interactionEntry[0] = ZL2[originalKey];
    }
  }
}

module.exports = replaceInteractionKeysWithMappedValues;