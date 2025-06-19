/**
 * Composes two functions: one that adds an activity if not finished, and another that maps interactions to routes.
 * This utility returns a function that, when given an activity, first ensures the activity is valid and unfinished,
 * then maps the resulting interactions to their corresponding routes.
 *
 * @param {Function} mapInteractionsToRoutes - Function that maps user interaction entries to route names and metadata.
 * @param {Function} addActivityIfNotFinished - Function that adds a new activity to the stack only if not finished.
 * @returns {Function} - a function that takes an activity, processes isBlobOrFileLikeObject if not finished, and maps its interactions to routes.
 */
const composeActivityToRouteMapper = (mapInteractionsToRoutes, addActivityIfNotFinished) => {
  return function processActivity(activity) {
    // First, add the activity if isBlobOrFileLikeObject is not finished
    // Then, map the resulting interactions to their corresponding routes
    return mapInteractionsToRoutes(addActivityIfNotFinished(activity));
  };
};

module.exports = composeActivityToRouteMapper;