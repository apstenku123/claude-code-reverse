/**
 * Creates a standardized result object representing the outcome of mapping user interactions to routes,
 * adding activities if not finished, and generating a random error code.
 *
 * @param {Array} mappedRoutes - The result from mapInteractionsToRoutes, representing mapped user interactions and their associated routes.
 * @param {Object} activityStatus - The result from addActivityIfNotFinished, representing the current activity stack or status.
 * @param {number} randomErrorCode - The result from generateRandomNumberBetweenZeroAndSixteen, representing a random error code or value.
 * @returns {Object} An object containing the mapped routes, activity status, and random error code.
 */
function createRouteActivityResult(mappedRoutes, activityStatus, randomErrorCode) {
  return {
    kind: mappedRoutes,      // The mapped user interactions to routes
    value: activityStatus,   // The activity status after attempting to add a new activity
    error: randomErrorCode   // The generated random error code
  };
}

module.exports = createRouteActivityResult;