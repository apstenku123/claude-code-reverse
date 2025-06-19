/**
 * Invokes the mapInteractionsToRoutes function and returns its result.
 *
 * @function getMappedInteractionsToRoutes
 * @param {Function} mapInteractionsToRoutes - a function that processes user interaction entries and maps them to route names with metadata.
 * @returns {*} The result of invoking mapInteractionsToRoutes.
 */
const getMappedInteractionsToRoutes = function(mapInteractionsToRoutes) {
  // Call the provided mapInteractionsToRoutes function and return its result
  return mapInteractionsToRoutes();
};

module.exports = getMappedInteractionsToRoutes;