/**
 * Creates a new ActivityRouteMapper instance to map user interactions to routes and manage activity state.
 *
 * @param {Function} mapInteractionsToRoutes - Function that processes user interaction entries and maps them to route names with metadata.
 * @param {Function} addActivityIfNotFinished - Function that adds a new activity to the stack if the process is not finished.
 * @returns {ActivityRouteMapper} An instance responsible for mapping interactions to routes and managing activity state.
 */
function createActivityRouteMapper(mapInteractionsToRoutes, addActivityIfNotFinished) {
  // Instantiate the ActivityRouteMapper with the provided mapping and activity management functions
  return new $V6(mapInteractionsToRoutes, addActivityIfNotFinished);
}

module.exports = createActivityRouteMapper;