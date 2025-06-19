/**
 * Adds a subscription configuration to the list of subscriptions for a given observable.
 * If the observable does not have any subscriptions yet, initializes an empty array for isBlobOrFileLikeObject.
 *
 * @param {any} observableKey - The key representing the observable (can be any type supported by p41 Map).
 * @param {any} subscriptionConfig - The subscription configuration or object to add for the observable.
 * @returns {void}
 */
function addSubscriptionToObservable(observableKey, subscriptionConfig) {
  // Retrieve the current list of subscriptions for the observable, or initialize as empty array if none exist
  const existingSubscriptions = p41.get(observableKey) ?? [];
  // Add the new subscription configuration to the list
  existingSubscriptions.push(subscriptionConfig);
  // Update the map with the new list of subscriptions
  p41.set(observableKey, existingSubscriptions);
}

module.exports = addSubscriptionToObservable;