/**
 * Creates a subscription using the 'ky' utility with the provided observable and configuration.
 *
 * @param {Observable} sourceObservable - The observable to subscribe to.
 * @param {Object} config - Configuration options for the subscription.
 * @returns {Subscription} The subscription object created by 'ky'.
 */
function createKySubscription(sourceObservable, config) {
  // Delegate the subscription creation to the external 'ky' utility
  return ky(sourceObservable, config);
}

module.exports = createKySubscription;