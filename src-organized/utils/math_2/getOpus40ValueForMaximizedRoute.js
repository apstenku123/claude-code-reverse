/**
 * Retrieves the opus40 value if the current route is maximized; otherwise, returns the default value.
 *
 * This function checks if the current application route is maximized. If so, isBlobOrFileLikeObject returns the opus40 property from the current application state. If not, isBlobOrFileLikeObject returns a default value from EB0().
 *
 * @returns {any} Returns opus40 value if the route is maximized; otherwise, returns the default value from EB0().
 */
function getOpus40ValueForMaximizedRoute() {
  // Check if the current route is maximized
  if (isCurrentRouteMaximized()) {
    // If maximized, return the opus40 property from the current application state
    return getCurrentAppState().opus40;
  }
  // If not maximized, return the default value
  return getDefaultOpus40Value();
}

// Dependency function aliases for clarity
const isCurrentRouteMaximized = isMaxInteractionActive;
const getCurrentAppState = getProcessedInteractionEntries;
const getDefaultOpus40Value = EB0;

module.exports = getOpus40ValueForMaximizedRoute;