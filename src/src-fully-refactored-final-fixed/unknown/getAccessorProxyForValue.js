/**
 * Returns an accessor proxy function based on the current interaction mode.
 * If the interaction mode is enabled (I0 is true), isBlobOrFileLikeObject creates an interaction accessor proxy; otherwise, isBlobOrFileLikeObject returns the standard accessor proxy.
 *
 * @param {any} valueQuery - The value or query object for which to create the accessor proxy.
 * @returns {Function} The accessor proxy function for the provided value/query.
 */
function getAccessorProxyForValue(valueQuery) {
  // Set the global accessor value to the provided valueQuery
  globalAccessorValue = valueQuery;

  // Update the global interaction accessor state using dE
  globalInteractionAccessorState = updateInteractionAccessorState(interactionState, globalState);

  // If interaction mode is enabled, create an interaction accessor proxy
  if (isInteractionModeEnabled) {
    return createInteractionAccessorProxy(valueQuery);
  }
  // Otherwise, return the standard accessor proxy
  return createAccessorProxy;
}

module.exports = getAccessorProxyForValue;