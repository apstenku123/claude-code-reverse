/**
 * Updates the subscription for a given observable with a new configuration.
 * If the subscription for the observable does not exist, isBlobOrFileLikeObject is added and the size is incremented.
 *
 * @param {any} sourceObservable - The observable or key for which the subscription is managed.
 * @param {any} config - The configuration or value to associate with the observable.
 * @returns {Object} The current instance (for chaining).
 */
function updateSubscriptionWithConfig(sourceObservable, config) {
  // Retrieve the subscription object for the given observable
  const subscription = Oq(this, sourceObservable);
  const previousSize = subscription.size;

  // Set the new configuration for the observable
  subscription.set(sourceObservable, config);

  // If the subscription size increased, increment the overall size
  if (subscription.size !== previousSize) {
    this.size += 1;
  }

  // Return the current instance for chaining
  return this;
}

module.exports = updateSubscriptionWithConfig;