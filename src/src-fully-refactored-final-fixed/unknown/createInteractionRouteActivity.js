/**
 * Creates a new InteractionRouteActivity instance.
 *
 * This function instantiates a new InteractionRouteActivity (lC6) using the provided
 * user interaction mapping function and activity addition handler. It is used to
 * map user interactions to route names and manage activity stack updates.
 *
 * @param {Function} mapInteractionsToRoutes - Processes an array of user interaction entries, mapping each to a route name and storing relevant metadata.
 * @param {Function} addActivityIfNotFinished - Adds a new activity to the activity stack only if the process has not been marked as finished.
 * @returns {InteractionRouteActivity} a new instance of InteractionRouteActivity initialized with the provided mapping and activity handler.
 */
function createInteractionRouteActivity(mapInteractionsToRoutes, addActivityIfNotFinished) {
  // Instantiate a new InteractionRouteActivity with the mapping and activity handler
  return new lC6(mapInteractionsToRoutes, addActivityIfNotFinished);
}

module.exports = createInteractionRouteActivity;