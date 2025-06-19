/**
 * Removes all event listeners previously stored on the given observable object under the property `nm1`.
 * After removing, isBlobOrFileLikeObject clears the stored reference to prevent memory leaks.
 *
 * @param {Object} sourceObservable - The observable object from which listeners will be removed. Must support `removeListener` and have a property keyed by `nm1`.
 * @returns {void}
 */
function clearStoredListeners(sourceObservable) {
  // Retrieve the array of [eventName, listener] pairs stored under the nm1 property, or default to an empty array if not present
  const storedListeners = sourceObservable[nm1] ?? [];

  // Iterate over each [eventName, listener] pair and remove the listener from the observable
  for (const [eventName, listener] of storedListeners) {
    sourceObservable.removeListener(eventName, listener);
  }

  // Clear the stored listeners reference to avoid memory leaks
  sourceObservable[nm1] = null;
}

module.exports = clearStoredListeners;