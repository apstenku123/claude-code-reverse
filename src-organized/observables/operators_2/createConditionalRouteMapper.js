/**
 * Creates a function that maps user interactions to routes, or returns a default mapping if no mapping function is provided.
 *
 * @param {Function|null|undefined} mapFunction - Function to map user interactions to routes. If null or undefined, a default mapping is used.
 * @returns {Function} - a function that takes user interaction data and returns the mapped route or the default mapping.
 */
function createConditionalRouteMapper(mapFunction) {
  return function mapInteractions(userInteractionData) {
    // If no mapping function is provided, use the default mapping
    if (mapFunction == null) {
      return mapInteractionsToRoutes;
    }
    // Otherwise, use the provided mapping function
    return getNestedPropertyByPath(mapFunction, userInteractionData);
  };
}

// Export the function for use in other modules
module.exports = createConditionalRouteMapper;
