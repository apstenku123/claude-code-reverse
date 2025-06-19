/**
 * Sets the global interaction-to-route mapping function.
 *
 * This function assigns the provided mapping function to the global variable
 * responsible for mapping user interactions to route names and metadata.
 *
 * @param {Function} mapInteractionsToRoutes - Function that processes an array of user interaction entries, mapping each to a route name and storing relevant metadata. Maintains a limited mapping size and updates or replaces entries based on duration and uniqueness.
 * @returns {void} This function does not return a value.
 */
function setInteractionToRouteMapper(mapInteractionsToRoutes) {
  // Assign the provided mapping function to the global variable
  Fs = mapInteractionsToRoutes;
}

module.exports = setInteractionToRouteMapper;