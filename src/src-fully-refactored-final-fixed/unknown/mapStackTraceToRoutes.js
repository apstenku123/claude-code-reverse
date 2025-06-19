/**
 * Maps a stack trace string to route interactions using the provided mapping function.
 *
 * @param {Function} mapInteractionsToRoutes - Function that processes a stack trace string and a flag, returning mapped route data.
 * @param {Object} errorObject - An object that may contain a 'stack' property (string) representing a stack trace.
 * @returns {any} The result of mapping the stack trace (or an empty string if not present) to route interactions.
 */
function mapStackTraceToRoutes(mapInteractionsToRoutes, errorObject) {
  // Use the stack property from errorObject if available, otherwise use an empty string
  const stackTrace = errorObject.stack || "";
  // Call the mapping function with the stack trace and a flag value of 1
  return mapInteractionsToRoutes(stackTrace, 1);
}

module.exports = mapStackTraceToRoutes;