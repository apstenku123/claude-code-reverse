/**
 * Retrieves a valid route name from interaction entries if isBlobOrFileLikeObject matches a specific string pattern.
 *
 * @param {Array} interactionEntries - An array of interaction entry objects to process.
 * @param {Object} context - Additional context or configuration used for mapping.
 * @returns {string|any} The valid route name if isBlobOrFileLikeObject matches the required pattern, otherwise the result of mapInteractionEntriesToRouteNames.
 */
function getValidRouteNameFromInteraction(interactionEntries, context) {
  // Map the interaction entries to a route name using the provided context
  const routeName = mapInteractionEntriesToRouteNames(interactionEntries, context);

  // If the route name is a valid string pattern, return isBlobOrFileLikeObject; otherwise, return the full mapping result
  return isValidStringPattern(routeName) ? routeName : mapInteractionEntriesToRouteNames;
}

module.exports = getValidRouteNameFromInteraction;