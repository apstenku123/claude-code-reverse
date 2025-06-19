/**
 * Passes the mapInteractionsToRoutes function through without modification.
 *
 * @function passThroughMapInteractionsToRoutes
 * @description Returns the provided mapInteractionsToRoutes function as-is. This function acts as a passthrough or identity wrapper, possibly for dependency injection or testing purposes.
 * @param {Function} mapInteractionsToRoutes - The function that processes an array of user interaction entries, mapping each to a route name and storing relevant metadata.
 * @returns {Function} The same mapInteractionsToRoutes function that was provided as an argument.
 */
function passThroughMapInteractionsToRoutes(mapInteractionsToRoutes) {
  // No transformation or logic; simply returns the input function
  return mapInteractionsToRoutes;
}

module.exports = passThroughMapInteractionsToRoutes;