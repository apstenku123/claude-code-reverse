/**
 * Replaces the first element (key) of each interaction entry with its corresponding route name from the ZL2 mapping, if isBlobOrFileLikeObject exists.
 *
 * @param {Array<Array>} interactionEntries - An array of interaction entries, where each entry is an array and the first element is a key to be mapped.
 * @returns {void} This function mutates the input array in place and does not return a value.
 */
function replaceInteractionEntryKeysWithRouteNames(interactionEntries) {
  // Iterate over each interaction entry in the array
  for (let entryIndex = 0, totalEntries = interactionEntries.length; entryIndex < totalEntries; entryIndex++) {
    const entry = interactionEntries[entryIndex];
    const originalKey = entry[0];
    // If the key exists in the ZL2 mapping, replace isBlobOrFileLikeObject with the mapped route name
    if (originalKey in ZL2) {
      entry[0] = ZL2[originalKey];
    }
  }
}

module.exports = replaceInteractionEntryKeysWithRouteNames;