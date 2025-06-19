/**
 * Creates a proxy object that delegates lifecycle methods (onExit, load, unload)
 * to the provided observable-like source object.
 *
 * @param {Object} sourceObservable - The object implementing lifecycle methods: onExit, load, unload.
 * @returns {Object} Proxy object with onExit, load, and unload methods delegating to sourceObservable.
 */
function createObservableLifecycleProxy(sourceObservable) {
  return {
    /**
     * Delegates the onExit event to the sourceObservable.
     * @param {Object} config - Configuration object for the exit event.
     * @param {any} subscription - Subscription or context for the exit event.
     * @returns {any} Result of sourceObservable.onExit.
     */
    onExit(config, subscription) {
      // Forward the onExit call to the sourceObservable
      return sourceObservable.onExit(config, subscription);
    },

    /**
     * Delegates the load event to the sourceObservable.
     * @returns {any} Result of sourceObservable.load.
     */
    load() {
      // Forward the load call to the sourceObservable
      return sourceObservable.load();
    },

    /**
     * Delegates the unload event to the sourceObservable.
     * @returns {any} Result of sourceObservable.unload.
     */
    unload() {
      // Forward the unload call to the sourceObservable
      return sourceObservable.unload();
    }
  };
}

module.exports = createObservableLifecycleProxy;
