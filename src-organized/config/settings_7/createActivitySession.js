/**
 * Factory function to create a new activity session instance.
 *
 * @param {Function} mapInteractionsToRoutes - Processes user interaction entries, mapping each to a route name and storing relevant metadata.
 * @param {Function} addActivityIfNotFinished - Adds a new activity to the activity stack only if the process has not been marked as finished.
 * @param {Object} [options={}] - Optional configuration object. If not provided, defaults to an empty object.
 * @returns {Ds} a new instance of Ds initialized with the provided functions and options.
 */
function createActivitySession(mapInteractionsToRoutes, addActivityIfNotFinished, options) {
  // Use the provided options object, or default to an empty object if null or undefined
  const sessionOptions = options !== null && options !== undefined ? options : {};

  // Create and return a new Ds instance with the given dependencies and options
  return new Ds(mapInteractionsToRoutes, addActivityIfNotFinished, sessionOptions);
}

module.exports = createActivitySession;