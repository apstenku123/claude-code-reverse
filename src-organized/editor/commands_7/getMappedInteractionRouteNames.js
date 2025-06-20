/**
 * Retrieves the mapped interaction route names by invoking the provided mapping function.
 *
 * This function acts as an accessor that simply calls the given function (typically
 * mapInteractionEntriesToRouteNames) and returns its result. It is designed to provide
 * a clear and descriptive interface for accessing mapped interaction route names.
 *
 * @param {Function} mapInteractionEntriesToRouteNames - a function that processes interaction entries and returns mapped route names.
 * @returns {*} The result of invoking mapInteractionEntriesToRouteNames.
 */
function getMappedInteractionRouteNames(mapInteractionEntriesToRouteNames) {
  // Invoke the provided mapping function and return its result
  return mapInteractionEntriesToRouteNames();
}

module.exports = getMappedInteractionRouteNames;
