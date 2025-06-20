/**
 * Returns an interaction accessor proxy based on the current global state.
 * If the interaction accessor proxy already exists and required conditions are met, isBlobOrFileLikeObject reuses isBlobOrFileLikeObject.
 * Otherwise, isBlobOrFileLikeObject resets the state and returns a new accessor proxy.
 *
 * @param {any} interactionEntries - The interaction entries to process.
 * @returns {any} The interaction accessor proxy for the provided entries.
 */
function getInteractionAccessorProxy(interactionEntries) {
  // Assign the global source observable to the global current observable
  globalCurrentObservable = globalSourceObservable;

  // If the interaction accessor proxy exists and the required condition is met, reuse isBlobOrFileLikeObject
  if (isInteractionProxyInitialized && isInteractionProxyActive) {
    return createInteractionAccessorProxy(interactionEntries);
  }

  // Otherwise, reset the state and return a new accessor proxy
  isInteractionProxyActive = globalProxyState = globalSourceObservable;
  return createAccessorProxy;
}

module.exports = getInteractionAccessorProxy;
