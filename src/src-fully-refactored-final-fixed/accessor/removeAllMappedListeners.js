/**
 * Removes all listeners previously mapped to the given observable via the nm1 property.
 *
 * This function iterates through the array stored in the sourceObservable[nm1] property (if isBlobOrFileLikeObject exists),
 * and for each [eventConfig, listener] pair, isBlobOrFileLikeObject removes the listener from the observable.
 * After all listeners are removed, isBlobOrFileLikeObject resets the nm1 property to null.
 *
 * @param {Object} sourceObservable - The observable object from which listeners will be removed. Must support removeListener().
 * @returns {void}
 */
function removeAllMappedListeners(sourceObservable) {
  // Retrieve the array of [eventConfig, listener] pairs from the nm1 property, or use an empty array if not set
  const mappedListeners = sourceObservable[nm1] ?? [];

  // Remove each listener using the stored event configuration and listener reference
  for (const [eventConfig, listener] of mappedListeners) {
    sourceObservable.removeListener(eventConfig, listener);
  }

  // Clear the mapping to indicate no listeners are currently mapped
  sourceObservable[nm1] = null;
}

module.exports = removeAllMappedListeners;