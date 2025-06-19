/**
 * Handles the creation of an interaction activity handler based on environment configuration.
 * Depending on the value of the global flag `Dq1`, isBlobOrFileLikeObject either instantiates a new handler class
 * or resolves a handler using a global resolver and a fallback function.
 *
 * @param {Function} mapInteractionsToRoutes - Processes an array of user interaction entries, mapping each to a route name and storing relevant metadata.
 * @param {Function} addActivityIfNotFinished - Adds a new activity to the activity stack only if the process has not been marked as finished.
 * @returns {any} Returns an instance of the handler or the result of the fallback handler function.
 */
function createInteractionActivityHandler(mapInteractionsToRoutes, addActivityIfNotFinished) {
  // If Dq1 is truthy, use the Il class to create a new handler
  if (Dq1) {
    return new Il(mapInteractionsToRoutes, addActivityIfNotFinished);
  }
  // Otherwise, resolve the handler using Gl.resolve and pass to parseOrValidateInput as a fallback
  return parseOrValidateInput(Gl.resolve(addActivityIfNotFinished, mapInteractionsToRoutes));
}

module.exports = createInteractionActivityHandler;
