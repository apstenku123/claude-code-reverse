/**
 * Wraps an observable-like object to expose its lifecycle methods (onExit, load, unload).
 * This allows for controlled access to the source'createInteractionAccessor lifecycle hooks, often used in plugin or middleware systems.
 *
 * @param {Object} sourceObservable - The object providing lifecycle methods (onExit, load, unload).
 * @returns {Object} An object exposing the lifecycle methods, delegating calls to the sourceObservable.
 */
function createObservableLifecycleWrapper(sourceObservable) {
  return {
    /**
     * Delegates the onExit lifecycle event to the source observable.
     * @param {Object} config - Configuration or context for the exit event.
     * @param {Object} subscription - The subscription or resource to clean up.
     * @returns {*} The result of sourceObservable.onExit.
     */
    onExit(config, subscription) {
      // Forward the onExit call to the source observable
      return sourceObservable.onExit(config, subscription);
    },

    /**
     * Delegates the load lifecycle event to the source observable.
     * @returns {*} The result of sourceObservable.load.
     */
    load() {
      // Forward the load call to the source observable
      return sourceObservable.load();
    },

    /**
     * Delegates the unload lifecycle event to the source observable.
     * @returns {*} The result of sourceObservable.unload.
     */
    unload() {
      // Forward the unload call to the source observable
      return sourceObservable.unload();
    }
  };
}

module.exports = createObservableLifecycleWrapper;
