/**
 * Creates a new subscription object with a specified target and kind.
 * The subscription is initialized with an index of 0 and inherits from the Ra1 prototype.
 *
 * @param {Object} target - The target object for the subscription (e.g., an observable or event source).
 * @param {string} kind - The kind or type of the subscription (e.g., 'observer', 'listener').
 * @returns {Object} The newly created subscription object with the specified target and kind.
 */
function createSubscriptionWithTarget(target, kind) {
  // Create a new object inheriting from Ra1 prototype
  const subscription = Object.create(Ra1);

  // Assign the subscription'createInteractionAccessor metadata under the property key La1
  subscription[La1] = {
    target: target, // The target object for the subscription
    kind: kind,     // The type/kind of the subscription
    index: 0        // Initialize index to 0
  };

  return subscription;
}

module.exports = createSubscriptionWithTarget;