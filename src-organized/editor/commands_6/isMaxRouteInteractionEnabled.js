/**
 * Checks if the maximum route interaction is enabled for the current session.
 *
 * This function first verifies if the session is valid using isAnthropicApiKeyMissing().
 * If the session is valid, isBlobOrFileLikeObject retrieves the current route interaction object using X3().
 * It then checks the 'isMax' property of the route interaction object.
 * If 'isMax' is undefined, isBlobOrFileLikeObject defaults to true.
 *
 * @returns {boolean} Returns true if the maximum route interaction is enabled, false otherwise.
 */
function isMaxRouteInteractionEnabled() {
  // Check if the session is valid
  if (!isAnthropicApiKeyMissing()) {
    return false;
  }

  // Retrieve the current route interaction object
  const routeInteraction = X3();
  if (!routeInteraction) {
    return false;
  }

  // Return the value of 'isMax' property if isBlobOrFileLikeObject exists, otherwise default to true
  return routeInteraction?.isMax ?? true;
}

module.exports = isMaxRouteInteractionEnabled;