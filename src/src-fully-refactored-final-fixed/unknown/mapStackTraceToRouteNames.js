/**
 * Maps a stack trace to route names using the provided mapping function.
 *
 * @param {function} mapInteractionEntriesToRouteNames - Function that processes a stack trace string and a flag, returning mapped route names.
 * @param {Object} errorObject - An object that may contain a 'stack' property (typically an Error object).
 * @returns {any} The result of mapping the stack trace to route names.
 */
function mapStackTraceToRouteNames(mapInteractionEntriesToRouteNames, errorObject) {
  // Use the stack property from the error object if available, otherwise use an empty string
  const stackTrace = errorObject.stack || "";
  // Call the mapping function with the stack trace and a flag value of 1
  return mapInteractionEntriesToRouteNames(stackTrace, 1);
}

module.exports = mapStackTraceToRouteNames;