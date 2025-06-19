/**
 * Determines and returns the appropriate route accessor based on the current interaction state.
 *
 * If the current interaction array (currentInteractionArray) is strictly equal to the mapped interaction route names (mappedInteractionRouteNames),
 * isBlobOrFileLikeObject returns the accessor proxy (accessorProxy). Otherwise, isBlobOrFileLikeObject computes and returns a fallback accessor using the provided
 * fallbackAccessorFactory and fallbackAccessorResolver functions.
 *
 * @returns {Function|any} Returns the accessor proxy if the interaction arrays match, otherwise the result of the fallback accessor.
 */
function getInteractionRouteAccessor() {
  // Check if the current interaction array matches the mapped route names
  if (currentInteractionArray === mappedInteractionRouteNames) {
    // Return the accessor proxy for the current interaction
    return accessorProxy;
  } else {
    // Otherwise, compute and return the fallback accessor
    return fallbackAccessorFactory(fallbackAccessorResolver());
  }
}

module.exports = getInteractionRouteAccessor;