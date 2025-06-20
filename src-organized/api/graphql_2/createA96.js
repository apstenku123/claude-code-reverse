/**
 * Factory function to create a new Ds instance with the provided observable, configuration, and optional subscription.
 *
 * @param {Observable} sourceObservable - The observable source to be processed.
 * @param {Object} config - Configuration object for the Ds instance.
 * @param {Object} [subscription={}] - Optional subscription object. If not provided, defaults to an empty object.
 * @returns {Ds} a new instance of Ds initialized with the given parameters.
 */
function createA96(sourceObservable, config, subscription) {
  // Use the provided subscription if available, otherwise default to an empty object
  const safeSubscription = subscription !== null && subscription !== undefined ? subscription : {};

  // Create and return a new Ds instance with the provided arguments
  return new Ds(sourceObservable, config, safeSubscription);
}

module.exports = createA96;