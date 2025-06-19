/**
 * Sets the global mapInteractionsToRoutes reference to the provided function or object.
 *
 * @param {Function|Object} mapInteractionsToRoutes - The function or object that processes user interaction entries, mapping each to a route name and storing relevant metadata.
 * @returns {void}
 */
function setMapInteractionsToRoutes(mapInteractionsToRoutes) {
  // Assign the provided mapInteractionsToRoutes to the global variable
  m21 = mapInteractionsToRoutes;
}

module.exports = setMapInteractionsToRoutes;