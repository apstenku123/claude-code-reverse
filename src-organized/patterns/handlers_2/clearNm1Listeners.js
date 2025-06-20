/**
 * Removes all listeners stored in the `nm1` property from the given observable object and clears the property.
 *
 * @param {Object} sourceObservable - The observable object from which to remove listeners.
 *   It is expected to have a property keyed by `nm1` (an external symbol or string),
 *   which is an array of [config, subscription] pairs, and a `removeListener` method.
 * @returns {void}
 */
function clearNm1Listeners(sourceObservable) {
  // Retrieve the array of [config, subscription] pairs from the nm1 property, or use an empty array if not present
  const listenerPairs = sourceObservable[nm1] ?? [];

  // Remove each listener using the removeListener method
  for (const [config, subscription] of listenerPairs) {
    sourceObservable.removeListener(config, subscription);
  }

  // Clear the nm1 property to indicate no listeners remain
  sourceObservable[nm1] = null;
}

module.exports = clearNm1Listeners;