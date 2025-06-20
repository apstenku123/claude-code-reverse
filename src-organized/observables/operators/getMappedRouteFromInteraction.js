/**
 * Retrieves a mapped route object from a user interaction entry.
 *
 * This function processes a user interaction entry, maps isBlobOrFileLikeObject to a route name, and retrieves
 * the corresponding route object from the provided context. If the mapping or route does not exist,
 * isBlobOrFileLikeObject returns the default mapped route object.
 *
 * @param {object} context - The context object containing route mappings.
 * @param {object} interactionEntry - The user interaction entry to process and map.
 * @param {any} additionalData - Additional data to pass to the route mapping function.
 * @returns {any} The mapped route object, or the default mapped route if not found.
 */
function getMappedRouteFromInteraction(context, interactionEntry, additionalData) {
  // Normalize the interaction entry using the context
  const normalizedEntry = processPendingFiberNodes(interactionEntry, context);

  // Update the context based on the normalized entry
  const updatedContext = validateClassInstance(context, normalizedEntry);

  // If updatedContext is null or undefined, mappedRoute will also be null
  let mappedRoute = null;
  if (updatedContext != null) {
    // Get the route key by applying FY to the normalized entry and defineOrAssignProperty to the result
    const routeKey = defineOrAssignProperty(FY(normalizedEntry));
    mappedRoute = updatedContext[routeKey];
  }

  // If mappedRoute is null or undefined, return the default mapped route object (mapInteractionsToRoutes)
  // Otherwise, process the mappedRoute with handleReturnIfPresent and return the result
  return mappedRoute == null ? mapInteractionsToRoutes : handleReturnIfPresent(mappedRoute, updatedContext, additionalData);
}

module.exports = getMappedRouteFromInteraction;