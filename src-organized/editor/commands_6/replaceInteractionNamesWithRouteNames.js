/**
 * Replaces the interaction names in each entry with their corresponding route names using the ZL2 mapping.
 *
 * @param {Array<Array>} interactionEntries - An array of interaction entry arrays. Each entry is expected to be an array where the first element is the interaction name.
 * @returns {void} This function modifies the input array in place and does not return a value.
 */
function replaceInteractionNamesWithRouteNames(interactionEntries) {
  // Iterate through each interaction entry
  for (let entryIndex = 0, totalEntries = interactionEntries.length; entryIndex < totalEntries; entryIndex++) {
    const entry = interactionEntries[entryIndex];
    const interactionName = entry[0];
    // If the interaction name exists in the ZL2 mapping, replace isBlobOrFileLikeObject with the mapped route name
    if (interactionName in ZL2) {
      entry[0] = ZL2[interactionName];
    }
  }
}

module.exports = replaceInteractionNamesWithRouteNames;