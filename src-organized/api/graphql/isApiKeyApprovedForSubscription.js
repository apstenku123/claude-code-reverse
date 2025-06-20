/**
 * Checks if the API key for a given subscription (derived from the input) is approved in the cached or fresh configuration.
 *
 * @param {any} sourceObservable - The source observable or identifier used to derive the subscription key.
 * @returns {boolean} True if the API key is approved for the subscription, false otherwise.
 */
function isApiKeyApprovedForSubscription(sourceObservable) {
  // Retrieve the configuration object (cached or fresh)
  const config = getCachedOrFreshConfig();
  // Derive the subscription key or identifier from the input
  const subscription = WF(sourceObservable);
  // Check if the approved API keys list includes the subscription
  return config.customApiKeyResponses?.approved?.includes(subscription) ?? false;
}

module.exports = isApiKeyApprovedForSubscription;