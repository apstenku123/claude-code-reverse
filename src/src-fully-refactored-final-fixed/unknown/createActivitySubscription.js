/**
 * Creates a subscription function that, when invoked, processes user interactions and updates the activity stack if not finished.
 *
 * @param {Function} mapInteractionsToRoutes - Function that processes an array of user interaction entries, mapping each to a route name and storing relevant metadata.
 * @param {Function} addActivityIfNotFinished - Function that adds a new activity to the activity stack only if the process has not been marked as finished.
 * @returns {Function} a function that, when called, executes the mapping and activity addition logic, returning the latest activity state.
 */
function createActivitySubscription(mapInteractionsToRoutes, addActivityIfNotFinished) {
  /**
   * Subscription function that processes the current interactions and updates the activity stack.
   *
   * @returns {any} The updated activity state after processing.
   */
  return function subscription() {
    // Only proceed if mapInteractionsToRoutes is truthy
    if (mapInteractionsToRoutes) {
      // sA0 is assumed to be an external function that returns an array of keys for mapInteractionsToRoutes
      // Use the first key to invoke the corresponding method on mapInteractionsToRoutes
      const methodKey = sA0(mapInteractionsToRoutes)[0];
      // Call the method, passing 0 as the argument, and update addActivityIfNotFinished
      addActivityIfNotFinished = mapInteractionsToRoutes[methodKey](mapInteractionsToRoutes = 0);
    }
    // Return the updated activity state
    return addActivityIfNotFinished;
  };
}

module.exports = createActivitySubscription;