/**
 * Adds a configuration object to the list of subscriptions for a given observable in the p41 map.
 * If the observable does not have any subscriptions yet, initializes the list.
 *
 * @param {object} observable - The observable object to associate the configuration with.
 * @param {object} config - The configuration object to add to the observable'createInteractionAccessor subscription list.
 * @returns {void}
 */
function addConfigToObservableSubscriptions(observable, config) {
  // Retrieve the current list of subscriptions for the observable, or initialize as an empty array if none exist
  const existingSubscriptions = p41.get(observable) ?? [];
  // Add the new configuration to the list of subscriptions
  existingSubscriptions.push(config);
  // Update the map with the new list of subscriptions
  p41.set(observable, existingSubscriptions);
}

module.exports = addConfigToObservableSubscriptions;