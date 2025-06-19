/**
 * Creates a new subscription object for tracking route interactions.
 *
 * @param {Object} targetRoute - The target route or observable to be tracked.
 * @param {string} interactionKind - The kind of interaction or configuration for the subscription.
 * @returns {Object} a new subscription object with initialized properties.
 */
function createRouteInteractionSubscription(targetRoute, interactionKind) {
  // Create a new object inheriting from Ra1 prototype
  const subscription = Object.create(Ra1);

  // Assign the subscription details to the property named by La1
  subscription[La1] = {
    target: targetRoute, // The route or observable being tracked
    kind: interactionKind, // The type or configuration of the interaction
    index: 0 // Initialize the index to 0
  };

  return subscription;
}

module.exports = createRouteInteractionSubscription;