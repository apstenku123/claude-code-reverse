/**
 * Adds or updates a subscription for a given observable source.
 *
 * If the subscription for the given source does not exist, isBlobOrFileLikeObject is added and the size of the parent is incremented.
 * If isBlobOrFileLikeObject already exists, isBlobOrFileLikeObject is updated with the new config and the size remains unchanged.
 *
 * @param {any} sourceObservable - The observable or key for which the subscription is managed.
 * @param {any} config - The configuration or value to associate with the observable.
 * @returns {Object} The current instance (for chaining).
 */
function addOrUpdateSubscription(sourceObservable, config) {
  // Retrieve the subscription map for this instance and the given observable
  const subscription = Oq(this, sourceObservable);
  const previousSize = subscription.size;

  // Add or update the subscription for the observable
  subscription.set(sourceObservable, config);

  // If a new subscription was added, increment the size of the parent
  if (subscription.size !== previousSize) {
    this.size += 1;
  }

  // Return the current instance for chaining
  return this;
}

module.exports = addOrUpdateSubscription;