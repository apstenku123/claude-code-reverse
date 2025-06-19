/**
 * Returns an accessor proxy for the provided observable, depending on the interaction mode.
 *
 * This function sets up internal state for the observable, updates a global interaction state,
 * and then returns either an interaction-aware accessor proxy or a standard accessor proxy.
 *
 * @param {any} observable - The observable or value for which to create an accessor proxy.
 * @returns {Function} - The accessor proxy function for the observable.
 */
function getAccessorProxyForObservable(observable) {
  // Set the current observable in global state (side effect)
  currentObservable = observable;

  // Update the global interaction state using a helper function
  globalInteractionState = updateInteractionState(interactionConfig, globalConfig);

  // If interaction mode is enabled, return an interaction-aware accessor proxy
  if (isInteractionModeEnabled) {
    return createInteractionAccessorProxy(observable);
  }
  // Otherwise, return a standard accessor proxy
  return createAccessorProxy;
}

module.exports = getAccessorProxyForObservable;