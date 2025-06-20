/**
 * Returns the first interaction entry from the provided array, or a default value if the array is empty or falsy.
 *
 * @param {Array} interactionEntries - An array of interaction entry objects.
 * @returns {any} The first interaction entry if available, otherwise the default mapped route names value.
 */
function getFirstInteractionOrDefault(interactionEntries) {
  // 'mapInteractionEntriesToRouteNames' is assumed to be a default or fallback value
  // when no interaction entries are provided.
  return interactionEntries && interactionEntries.length
    ? interactionEntries[0]
    : mapInteractionEntriesToRouteNames;
}

module.exports = getFirstInteractionOrDefault;