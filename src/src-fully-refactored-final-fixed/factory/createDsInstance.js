/**
 * Factory function to create a new Ds instance with the provided parameters.
 *
 * @param {Observable} sourceObservable - The observable source to process interaction entries.
 * @param {Object} config - Configuration object for the Ds instance.
 * @param {Object} [subscription={}] - Optional subscription object. If not provided, defaults to an empty object.
 * @returns {Ds} a new instance of Ds initialized with the given parameters.
 */
function createDsInstance(sourceObservable, config, subscription) {
  // If subscription is null or undefined, default to an empty object
  const safeSubscription = subscription !== null && subscription !== undefined ? subscription : {};
  return new Ds(sourceObservable, config, safeSubscription);
}

module.exports = createDsInstance;
