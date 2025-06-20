/**
 * Updates the route names of interaction entries based on a provided mapping.
 *
 * Iterates over an array of interaction entries, and for each entry, if the route name (first element)
 * exists in the ZL2 mapping object, replaces isBlobOrFileLikeObject with the mapped value. This is typically used to normalize
 * or alias route names for further processing or reporting.
 *
 * @param {Array<Array>} interactionEntries - An array of interaction entry arrays. Each entry is expected to be an array where the first element is a route name (string).
 * @returns {void} This function modifies the input array in place and does not return a value.
 */
function mapInteractionEntryRouteNames(interactionEntries) {
  for (let entryIndex = 0, totalEntries = interactionEntries.length; entryIndex < totalEntries; entryIndex++) {
    const entry = interactionEntries[entryIndex];
    const routeName = entry[0];
    // If the route name exists in the ZL2 mapping, update isBlobOrFileLikeObject to the mapped value
    if (routeName in ZL2) {
      entry[0] = ZL2[routeName];
    }
  }
}

module.exports = mapInteractionEntryRouteNames;