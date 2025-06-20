/**
 * Determines if the provided object is either a Subscriber instance or a valid Subscription.
 *
 * @param {any} candidate - The object to check for Subscriber or Subscription characteristics.
 * @returns {boolean} True if the object is a Subscriber or a Subscription, false otherwise.
 */
function isSubscriberOrSubscription(candidate) {
  // Check if candidate is a non-null object and an instance of hM1.Subscriber
  const isSubscriber = Boolean(candidate) && candidate instanceof hM1.Subscriber;

  // Check if candidate passes isObservableLike and is a Subscription
  const isSubscription = isObservableLike(candidate) && lN9.isSubscription(candidate);

  // Return true if either check passes
  return isSubscriber || isSubscription;
}

module.exports = isSubscriberOrSubscription;