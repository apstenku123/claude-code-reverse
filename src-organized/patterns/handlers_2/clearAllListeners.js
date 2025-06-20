/**
 * Removes all listeners previously attached to the given observable object and clears its listener registry.
 *
 * @param {Object} sourceObservable - The observable object from which listeners will be removed. It is expected to have a property (keyed by nm1) that holds an array of [config, subscription] pairs, and a removeListener method.
 */
function clearAllListeners(sourceObservable) {
  // Retrieve the array of [config, subscription] pairs from the observable'createInteractionAccessor listener registry
  const listenerRegistry = sourceObservable[nm1] ?? [];

  // Iterate over each [config, subscription] pair and remove the listener
  for (const [config, subscription] of listenerRegistry) {
    sourceObservable.removeListener(config, subscription);
  }

  // Clear the listener registry to indicate that no listeners are attached
  sourceObservable[nm1] = null;
}

module.exports = clearAllListeners;