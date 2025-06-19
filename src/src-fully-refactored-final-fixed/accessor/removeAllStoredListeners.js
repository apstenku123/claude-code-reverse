/**
 * Removes all event listeners previously stored on the given observable object.
 *
 * This function iterates over the stored listeners (if any) on the provided observable object,
 * removes each listener using the object'createInteractionAccessor removeListener method, and then clears the stored listeners reference.
 *
 * @param {Object} sourceObservable - The object from which to remove all stored listeners. Must implement removeListener.
 * @returns {void}
 */
function removeAllStoredListeners(sourceObservable) {
  // Retrieve the array of [eventName, listener] pairs from the special property, or use an empty array if none exist
  const storedListeners = sourceObservable[nm1] ?? [];

  // Remove each stored listener from the observable
  for (const [eventName, listener] of storedListeners) {
    sourceObservable.removeListener(eventName, listener);
  }

  // Clear the stored listeners reference
  sourceObservable[nm1] = null;
}

module.exports = removeAllStoredListeners;