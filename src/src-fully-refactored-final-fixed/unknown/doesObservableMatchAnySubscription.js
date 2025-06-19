/**
 * Checks if a given observable name matches any subscription'createInteractionAccessor user-facing name or aliases.
 *
 * @param {string} observableName - The observable name to check for a match.
 * @param {Array<Object>} subscriptions - Array of subscription objects, each with a userFacingName() method and optional aliases array.
 * @returns {boolean} True if any subscription matches the observable name directly or via its aliases; otherwise, false.
 */
function doesObservableMatchAnySubscription(observableName, subscriptions) {
  // Iterate over subscriptions to check for a direct or alias match
  return subscriptions.some(subscription =>
    subscription.userFacingName() === observableName ||
    (subscription.aliases?.includes(observableName))
  );
}

module.exports = doesObservableMatchAnySubscription;