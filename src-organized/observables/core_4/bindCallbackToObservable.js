/**
 * Binds a callback to an observable source using the provided configuration and subscription.
 *
 * @param {Observable} sourceObservable - The observable source to bind the callback to.
 * @param {Object} config - Configuration options for binding the callback.
 * @param {Subscription} subscription - The subscription object to manage the callback binding.
 * @returns {any} The result of binding the callback to the observable using the specified configuration and subscription.
 */
function bindCallbackToObservable(sourceObservable, config, subscription) {
  // Call the internal method to bind the callback with the given parameters
  // The first argument 'false' indicates a specific binding mode (do not change behavior)
  return tL9.bindCallbackInternals(false, sourceObservable, config, subscription);
}

module.exports = bindCallbackToObservable;