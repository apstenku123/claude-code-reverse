/**
 * Checks if a subscription contains an entry matching the given config and source observable.
 *
 * @param {Object} sourceObservable - The observable object being checked.
 * @param {string} config - The key or configuration identifier to look up in the subscription.
 * @param {Map} subscription - a map where keys are config identifiers and values are arrays of subscription entries.
 * @returns {boolean} True if a matching entry is found; otherwise, false.
 */
function hasMatchingSubscriptionEntry(sourceObservable, config, subscription) {
  // Retrieve the array of subscription entries for the given config, or an empty array if none exist
  const subscriptionEntries = subscription.get(sourceObservable[config]) || [];

  // Iterate through each entry to find a match
  for (let i = 0, length = subscriptionEntries.length; i < length; i++) {
    const entry = subscriptionEntries[i];
    // Check if both the key and the observable object match
    if (entry.key === config && entry.obj === sourceObservable) {
      return true;
    }
  }
  // No matching entry found
  return false;
}

module.exports = hasMatchingSubscriptionEntry;