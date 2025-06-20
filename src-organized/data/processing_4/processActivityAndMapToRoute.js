/**
 * Processes an activity if isBlobOrFileLikeObject is not finished, maps the resulting interactions to routes, and applies an external transformation.
 *
 * @param {Function} mapInteractionsToRoutes - Function that maps user interaction entries to route names and stores relevant metadata.
 * @param {Function|undefined} addActivityIfNotFinished - Function that adds a new activity to the activity stack only if the process has not been marked as finished. If undefined, the function returns early.
 * @returns {any} The result of applying the formatStackTraceEntries transformation to the mapped interactions, or undefined if addActivityIfNotFinished is not provided.
 */
function processActivityAndMapToRoute(mapInteractionsToRoutes, addActivityIfNotFinished) {
  // If addActivityIfNotFinished is not provided, exit early
  if (addActivityIfNotFinished === undefined) return;
  // Call addActivityIfNotFinished with argument 1, then map the result to routes
  // Finally, apply the formatStackTraceEntries transformation to the mapped result
  return formatStackTraceEntries(mapInteractionsToRoutes(addActivityIfNotFinished(1)));
}

module.exports = processActivityAndMapToRoute;