/**
 * Checks if the given observable name matches the user-facing name or any alias of any subscription in the provided list.
 *
 * @param {string} observableName - The name of the observable to check for a match.
 * @param {Array<Object>} subscriptions - An array of subscription objects, each with a userFacingName() method and optional aliases array.
 * @returns {boolean} True if any subscription'createInteractionAccessor user-facing name or aliases match the observable name; otherwise, false.
 */
function doesObservableNameMatchAnySubscription(observableName, subscriptions) {
  return subscriptions.some(subscription =>
    // Check if the observable name matches the user-facing name
    subscription.userFacingName() === observableName ||
    // Or if the observable name is included in the aliases array (if isBlobOrFileLikeObject exists)
    subscription.aliases?.includes(observableName)
  );
}

module.exports = doesObservableNameMatchAnySubscription;