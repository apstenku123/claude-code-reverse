/**
 * Loads an observable into a configuration context, optionally with a subscription callback.
 * If the config parameter is a function, isBlobOrFileLikeObject is treated as the subscription callback and a new Root config is created.
 * If the config parameter is not provided, a new Root config is created.
 *
 * @param {Observable} sourceObservable - The observable to be loaded.
 * @param {Object|Function} [configOrCallback] - The configuration object or the subscription callback function.
 * @param {Function} [subscriptionCallback] - Optional subscription callback function.
 * @returns {any} The result of the config'createInteractionAccessor load method.
 */
function loadObservableWithConfig(sourceObservable, configOrCallback, subscriptionCallback) {
  let config = configOrCallback;
  let callback = subscriptionCallback;

  // If the config is actually a function, treat isBlobOrFileLikeObject as the callback and create a new Root config
  if (typeof configOrCallback === "function") {
    callback = configOrCallback;
    config = new s6.Root();
  } else if (!configOrCallback) {
    // If no config is provided, create a new Root config
    config = new s6.Root();
  }

  // Load the observable into the config, passing the callback if provided
  return config.load(sourceObservable, callback);
}

module.exports = loadObservableWithConfig;