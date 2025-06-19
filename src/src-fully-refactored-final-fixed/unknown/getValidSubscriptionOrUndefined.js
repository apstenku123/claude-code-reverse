/**
 * Attempts to create a subscription from the provided observable and configuration.
 * Returns the subscription if isBlobOrFileLikeObject is valid, otherwise returns undefined.
 *
 * @param {Object} sourceObservable - The observable to subscribe to.
 * @param {Object} config - The configuration object for the subscription.
 * @returns {Object|undefined} The valid subscription object, or undefined if invalid.
 */
function getValidSubscriptionOrUndefined(sourceObservable, config) {
  // Attempt to create a subscription using the provided observable and config
  const subscription = s0A(sourceObservable, config);
  // Check if the created subscription is valid
  return a0A(subscription) ? subscription : undefined;
}

module.exports = getValidSubscriptionOrUndefined;