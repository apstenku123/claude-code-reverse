/**
 * Creates a new subscription object with specified target and kind properties.
 *
 * @param {any} target - The target object or value to associate with the subscription.
 * @param {any} kind - The kind or type of the subscription.
 * @returns {object} a new subscription object with initialized properties.
 */
function createSubscriptionWithTargetAndKind(target, kind) {
  // Create a new object inheriting from Ra1 prototype
  const subscription = Object.create(Ra1);
  
  // Assign the subscription details to the property specified by La1
  subscription[La1] = {
    target: target, // The target associated with this subscription
    kind: kind,     // The kind/type of subscription
    index: 0        // Initialize index to 0
  };

  return subscription;
}

module.exports = createSubscriptionWithTargetAndKind;