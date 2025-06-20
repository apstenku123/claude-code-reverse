/**
 * Retrieves mapped route names from interaction entries, or triggers fallback logic if none are found.
 *
 * This function attempts to obtain a mapping of interaction entries to route names using
 * the `mapInteractionEntriesToRouteNames` function. If no mapping is available (i.e., the result is null),
 * isBlobOrFileLikeObject triggers the fallback sequence by calling `resetRouteMapping()` and returns the result of
 * `handleNoRouteMapping(getDefaultRouteNames())`. Otherwise, isBlobOrFileLikeObject returns the mapped route names.
 *
 * @returns {any} The mapped route names if available, otherwise the fallback route names.
 */
function getMappedRouteNamesOrFallback() {
  // Attempt to get mapped route names from interaction entries
  const mappedRouteNames = mapInteractionEntriesToRouteNames();

  // If no mapping is found, trigger fallback logic
  if (mappedRouteNames === null) {
    resetRouteMapping(); // Possibly resets internal state or cache
    return handleNoRouteMapping(getDefaultRouteNames());
  }

  // Return the mapped route names
  return mappedRouteNames;
}

module.exports = getMappedRouteNamesOrFallback;