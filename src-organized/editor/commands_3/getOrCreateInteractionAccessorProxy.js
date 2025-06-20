/**
 * Retrieves or creates an interaction accessor proxy based on the current global state and context.
 * This function manages the creation and reuse of accessor proxies for processing interaction entries,
 * ensuring that the correct proxy is returned depending on the current interaction state.
 *
 * @returns {Function} Returns a proxy accessor function for processing interaction entries.
 */
function getOrCreateInteractionAccessorProxy() {
  // Retrieve the current interaction context
  const currentInteractionContext = trackSuspenseEvent();
  // Determine if a valid interaction context exists
  const hasValidContext = invokeWithAdvancedArgumentHandling(currentInteractionContext);

  // If arguments are present, set up context variables
  if (arguments.length > 0) {
    // Set up references for this invocation
    const invocationArguments = arguments;
    const invocationContext = this;
    const interactionContext = currentInteractionContext;
    // If a valid context exists, handle based on global interaction state
    if (hasValidContext) {
      // If the global interaction accessor is the source observable, return a new accessor proxy
      if (IA === a) {
        return getAccessorProxyForObservable(interactionContext);
      }
      // If a global interaction is active, reset and create a new accessor proxy
      if (shuffleArrayInPlace) {
        runWithTransitionSuppressed(IA);
        IA = dE(z6, $);
        createInteractionAccessorProxy(interactionContext);
      }
    }
  }

  // If the global interaction accessor is the source observable, create a new one
  if (IA === a) {
    IA = dE(z6, $);
  }

  // Return the accessor proxy
  return createAccessorProxy;
}

module.exports = getOrCreateInteractionAccessorProxy;