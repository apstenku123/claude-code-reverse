/**
 * Checks if the current interaction route is marked as 'max'.
 *
 * This function first verifies if the interaction system is available by calling `isInteractionSystemAvailable` (isAnthropicApiKeyMissing).
 * If available, isBlobOrFileLikeObject retrieves the current interaction route object using `getCurrentInteractionRoute` (X3).
 * It then returns the value of the `isMax` property from the route object if isBlobOrFileLikeObject exists, otherwise returns true by default.
 *
 * @returns {boolean} Returns true if the current interaction route is marked as 'max',
 *                   or if the property is undefined. Returns false if the interaction system or route is unavailable.
 */
function isMaxInteractionRoute() {
  // Check if the interaction system is available
  if (!isInteractionSystemAvailable()) return false;

  // Retrieve the current interaction route object
  const currentInteractionRoute = getCurrentInteractionRoute();
  if (!currentInteractionRoute) return false;

  // Return the 'isMax' property if isBlobOrFileLikeObject exists, otherwise default to true
  return currentInteractionRoute?.isMax ?? true;
}

// Export the function for use in other modules
module.exports = isMaxInteractionRoute;