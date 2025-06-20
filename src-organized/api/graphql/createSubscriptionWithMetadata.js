/**
 * Creates a new subscription object with associated metadata.
 *
 * @param {Object} targetObservable - The observable or target object to subscribe to.
 * @param {string} subscriptionKind - The kind or type of subscription to create.
 * @returns {Object} a new subscription object with metadata attached.
 */
function createSubscriptionWithMetadata(targetObservable, subscriptionKind) {
  // Create a new object inheriting from Ra1 (assumed to be a subscription prototype)
  const subscription = Object.create(Ra1);

  // Attach metadata to the subscription using the La1 property key
  subscription[La1] = {
    target: targetObservable, // The observable or target being subscribed to
    kind: subscriptionKind,   // The type or kind of subscription
    index: 0                  // Initial index value
  };

  return subscription;
}

module.exports = createSubscriptionWithMetadata;