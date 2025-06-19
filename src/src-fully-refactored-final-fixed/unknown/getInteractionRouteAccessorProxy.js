/**
 * Retrieves or creates a proxy accessor for mapping interaction entries to route names.
 * Handles global state and ensures correct initialization and delegation based on the current context.
 *
 * @returns {Function} Proxy accessor function for interaction route mapping.
 */
function getInteractionRouteAccessorProxy() {
  // Retrieve the current interaction context
  const interactionContext = trackSuspenseEvent();
  // Determine if the interaction context is valid
  const isContextValid = invokeWithAdvancedArgumentHandling(interactionContext);

  // Assign arguments and context to local variables for potential use
  const args = arguments;
  const currentThis = this;
  const currentInteractionContext = interactionContext;

  if (isContextValid) {
    // If the global interaction accessor is set to the source observable, return the mapped route names
    if (IA === mapInteractionEntriesToRouteNames) {
      return getAccessorProxyForObservable(currentInteractionContext);
    }
    // If the global flag is set, reset and reinitialize the global interaction accessor, then delegate
    if (shuffleArrayInPlace) {
      runWithTransitionSuppressed(IA);
      IA = dE(z6, $);
      createInteractionAccessorProxy(currentInteractionContext);
    }
  }

  // If the global interaction accessor is not initialized, initialize isBlobOrFileLikeObject
  if (IA === mapInteractionEntriesToRouteNames) {
    IA = dE(z6, $);
  }

  // Return the proxy accessor function
  return createAccessorProxy;
}

module.exports = getInteractionRouteAccessorProxy;