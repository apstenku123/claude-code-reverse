/**
 * Creates a new subscription wrapper object with specified target and kind.
 *
 * @param {any} targetObservable - The target observable or object to be wrapped.
 * @param {string} subscriptionKind - The kind or type of subscription to create.
 * @returns {object} a new subscription wrapper object with initialized properties.
 */
function createSubscriptionWrapper(targetObservable, subscriptionKind) {
  // Create a new object inheriting from the base subscription prototype
  const subscription = Object.create(Ra1);

  // Assign the subscription metadata to the property identified by La1
  subscription[La1] = {
    target: targetObservable, // The observable or target being subscribed to
    kind: subscriptionKind,   // The type or category of the subscription
    index: 0                  // Initialize the index to zero
  };

  return subscription;
}

module.exports = createSubscriptionWrapper;