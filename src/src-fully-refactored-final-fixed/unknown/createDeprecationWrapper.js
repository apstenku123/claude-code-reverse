/**
 * Creates a wrapper function that marks an observable as deprecated.
 *
 * @param {any} sourceObservable - The observable or value to be marked as deprecated.
 * @returns {function(config: any, subscription: any): any} a function that, when called, marks the observable as deprecated using the provided config.
 */
function createDeprecationWrapper(sourceObservable) {
  /**
   * Wrapper function to deprecate an observable.
   *
   * @param {any} config - Configuration or message for deprecation.
   * @param {any} subscription - (Unused) Subscription object or additional parameter.
   * @returns {any} The result of the deprecation process.
   */
  return function deprecateObservable(config, subscription) {
    // Calls the deprecate method from _76, passing the config and sourceObservable.
    return _76.deprecate(config, sourceObservable);
  };
}

module.exports = createDeprecationWrapper;