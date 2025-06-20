/**
 * Creates an accessor function that manages route activity mapping and ensures activity is added only if not finished.
 *
 * @param {Function} mapInteractionsToRouteNames - Processes an array of user interaction entries, mapping each to a route name and associated context.
 * @param {Function} addActivityIfNotFinished - Adds a new activity to the internal stack only if the process has not been marked as finished.
 * @returns {Function} Accessor function that, when called, processes the mapping and adds activity if needed, returning the current activity state.
 */
function createRouteActivityAccessor(mapInteractionsToRouteNames, addActivityIfNotFinished) {
  /**
   * Accessor function that processes the route mapping and manages activity state.
   *
   * @returns {*} The current activity state after processing.
   */
  return function routeActivityAccessor() {
    // If mapping function exists, process the mapping and update activity state
    if (mapInteractionsToRouteNames) {
      // h22 is assumed to return an array of keys; handleMissingDoctypeError use the first key to access the mapping
      const mappingKeys = h22(mapInteractionsToRouteNames);
      const firstKey = mappingKeys[0];
      // Call addActivityIfNotFinished with the mapped value, and reset mapInteractionsToRouteNames to 0
      addActivityIfNotFinished = mapInteractionsToRouteNames[firstKey](mapInteractionsToRouteNames = 0);
    }
    // Return the current activity state
    return addActivityIfNotFinished;
  };
}

module.exports = createRouteActivityAccessor;