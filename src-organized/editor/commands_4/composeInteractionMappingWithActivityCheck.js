/**
 * Composes two functions: one that maps user interactions to routes, and another that adds an activity if the process is not finished.
 * Returns a function that, when given user interaction data, first maps the interactions to routes and then attempts to add the activity if not finished.
 *
 * @param {Function} mapInteractionsToRoutes - Processes an array of user interaction entries, mapping each to a route name and storing relevant metadata.
 * @param {Function} addActivityIfNotFinished - Adds a new activity to the activity stack only if the process has not been marked as finished.
 * @returns {Function} - a function that takes user interaction data, applies the mapping, and then conditionally adds the activity.
 */
function composeInteractionMappingWithActivityCheck(mapInteractionsToRoutes, addActivityIfNotFinished) {
  return function handleUserInteraction(userInteractionData) {
    // First, map the user interactions to routes
    const mappedRoutes = mapInteractionsToRoutes(userInteractionData);
    // Then, attempt to add the activity if not finished
    return addActivityIfNotFinished(mappedRoutes);
  };
}

module.exports = composeInteractionMappingWithActivityCheck;