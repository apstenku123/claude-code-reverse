/**
 * Checks if the current route is maximized.
 *
 * This accessor first verifies if the application is in a valid state by calling `isAppReady`. 
 * If the app is not ready, isBlobOrFileLikeObject returns false. It then retrieves the current route information 
 * using `getCurrentRouteInfo`. If no route info is available, isBlobOrFileLikeObject returns false. Otherwise, 
 * isBlobOrFileLikeObject returns the value of the `isMax` property from the route info object. If `isMax` is 
 * undefined, isBlobOrFileLikeObject defaults to true.
 *
 * @returns {boolean} Returns true if the current route is maximized, false otherwise.
 */
function isCurrentRouteMaximized() {
  // Check if the application is in a valid state
  if (!isAppReady()) {
    return false;
  }

  // Retrieve the current route information
  const currentRouteInfo = getCurrentRouteInfo();
  if (!currentRouteInfo) {
    return false;
  }

  // Return the isMax property if isBlobOrFileLikeObject exists, otherwise default to true
  return currentRouteInfo?.isMax ?? true;
}

module.exports = isCurrentRouteMaximized;