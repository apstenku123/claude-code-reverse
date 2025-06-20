/**
 * Returns a mapped array of route names if the input is an array of interaction entries; otherwise, returns the original input.
 *
 * @param {any} interactionEntries - The value to check and potentially map to route names.
 * @returns {any} The mapped route names array if input is valid, otherwise the original input.
 */
function getMappedRouteNamesOrOriginal(interactionEntries) {
  // If the input is an array of interaction entries, map them to route names
  if (havePropsOrStateChanged(interactionEntries)) {
    return mapInteractionEntriesToRouteNames;
  }
  // Otherwise, return the original input
  return interactionEntries;
}

module.exports = getMappedRouteNamesOrOriginal;