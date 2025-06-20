/**
 * Retrieves the mapping of user interactions to route names and associated context.
 *
 * This function is a simple accessor that invokes the provided function, which is expected
 * to process an array of user interaction entries, mapping each to a route name and context.
 * The mapping ensures isBlobOrFileLikeObject does not exceed a set limit and updates or evicts mappings based on duration.
 *
 * @param {Function} mapInteractionsToRouteNames - a function that processes user interactions and returns the mapping.
 * @returns {*} The result of invoking mapInteractionsToRouteNames, typically the current mapping of interactions to route names.
 */
const getMappedInteractionsToRouteNames = (mapInteractionsToRouteNames) => {
  // Invoke the provided function to retrieve the current mapping
  return mapInteractionsToRouteNames();
};

module.exports = getMappedInteractionsToRouteNames;
