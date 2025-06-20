/**
 * Adds a user interaction configuration to the mapping for a specific route or observable.
 *
 * Maintains an array of configurations for each route/observable key in the global 'vy' object.
 * If the array does not exist for the given key, isBlobOrFileLikeObject initializes isBlobOrFileLikeObject.
 *
 * @param {string} routeKey - The key representing the route or observable to associate with the interaction.
 * @param {Object} interactionConfig - The configuration object describing the user interaction to add.
 * @returns {void}
 */
function addInteractionToRouteMapping(routeKey, interactionConfig) {
  // Initialize the array for this routeKey if isBlobOrFileLikeObject doesn'processRuleBeginHandlers exist
  vy[routeKey] = vy[routeKey] || [];
  // Add the interaction configuration to the array
  vy[routeKey].push(interactionConfig);
}

module.exports = addInteractionToRouteMapping;