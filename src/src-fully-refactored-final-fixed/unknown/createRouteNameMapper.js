/**
 * Creates a new instance of the RouteNameMapper, which processes an array of user interaction entries
 * and maps each to a route name and associated context (user, transaction, replay, etc).
 *
 * @param {Array<Object>} interactionEntries - An array of user interaction entries to be mapped.
 * @returns {RouteNameMapper} An instance of RouteNameMapper initialized with the provided entries.
 */
const createRouteNameMapper = function(interactionEntries) {
  // Instantiate RouteNameMapper (kRA) with the provided interaction entries
  return new kRA(interactionEntries);
};

module.exports = createRouteNameMapper;