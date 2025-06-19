/**
 * Searches for a subscription within the observable derived from the provided source,
 * returning the first subscription that matches the given configuration using isRuleContentUndefinedOrMatchingTool.
 *
 * @param {any} sourceObservable - The source object or observable to extract subscriptions from.
 * @param {any} config - The configuration or criteria to match against subscriptions.
 * @returns {any|null} The first matching subscription if found, otherwise null.
 */
function findMatchingSubscription(sourceObservable, config) {
  // Zv extracts an array of subscriptions from the sourceObservable
  const subscriptions = Zv(sourceObservable);
  // Find the first subscription that matches the config using isRuleContentUndefinedOrMatchingTool
  const matchingSubscription = subscriptions.find(subscription => isRuleContentUndefinedOrMatchingTool(config, subscription));
  // Return the matching subscription or null if none found
  return matchingSubscription || null;
}

module.exports = findMatchingSubscription;