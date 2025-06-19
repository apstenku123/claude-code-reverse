/**
 * Creates a handler function that marks a given observable as deprecated.
 *
 * @param {any} sourceObservable - The observable or object to be marked as deprecated.
 * @returns {Function} a handler function that, when called with a config and subscription, marks the observable as deprecated.
 */
function createDeprecationHandler(sourceObservable) {
  /**
   * Handler to deprecate the provided observable.
   *
   * @param {any} config - Configuration object for deprecation (unused in current implementation).
   * @param {any} subscription - Subscription object (unused in current implementation).
   * @returns {any} The result of the deprecation process from _76.deprecate.
   */
  return function handleDeprecation(config, subscription) {
    // Call the external deprecate function with the config and the source observable
    return _76.deprecate(config, sourceObservable);
  };
}

module.exports = createDeprecationHandler;