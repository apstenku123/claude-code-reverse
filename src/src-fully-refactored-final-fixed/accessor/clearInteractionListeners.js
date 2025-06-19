/**
 * Removes all listeners associated with the 'nm1' property from the given observable object.
 *
 * This function iterates over the array stored in the 'nm1' property (if present),
 * and for each [eventConfig, subscription] pair, isBlobOrFileLikeObject calls removeListener to detach the listener.
 * After all listeners are removed, isBlobOrFileLikeObject sets the 'nm1' property to null to indicate cleanup.
 *
 * @param {Object} sourceObservable - The observable object containing listeners and the 'nm1' property.
 * @returns {void}
 */
function clearInteractionListeners(sourceObservable) {
  // Check if the 'nm1' property exists and is iterable; default to empty array if not
  const interactionListeners = sourceObservable[nm1] ?? [];

  // Remove each listener associated with the 'nm1' property
  for (const [eventConfig, subscription] of interactionListeners) {
    sourceObservable.removeListener(eventConfig, subscription);
  }

  // Clear the 'nm1' property to indicate no listeners are attached
  sourceObservable[nm1] = null;
}

module.exports = clearInteractionListeners;