/**
 * Determines if the provided object is either:
 *   1. An instance of hM1.Subscriber, or
 *   2. a subscription object as determined by isObservableLike and lN9.isSubscription.
 *
 * @param {any} candidate - The object to test for subscriber or subscription characteristics.
 * @returns {boolean} True if the object is a Subscriber or a Subscription, false otherwise.
 */
function isEventSubscriberOrSubscription(candidate) {
  // Check if candidate is truthy and an instance of hM1.Subscriber
  if (candidate && candidate instanceof hM1.Subscriber) {
    return true;
  }

  // Check if candidate passes isObservableLike and is a subscription per lN9.isSubscription
  if (isObservableLike(candidate) && lN9.isSubscription(candidate)) {
    return true;
  }

  // Otherwise, not a Subscriber or Subscription
  return false;
}

module.exports = isEventSubscriberOrSubscription;