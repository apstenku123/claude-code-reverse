/**
 * Checks if the API key response for a given observable is approved in the current configuration.
 *
 * @param {any} sourceObservable - The observable or identifier to check approval for.
 * @returns {boolean} True if the API key response is approved, false otherwise.
 */
function isApiKeyResponseApproved(sourceObservable) {
  // Retrieve the current configuration (from cache or fresh from disk)
  const config = getCachedOrFreshConfig();
  // Get the subscription or key associated with the observable
  const subscription = WF(sourceObservable);
  // Check if the subscription is included in the list of approved custom API key responses
  return config.customApiKeyResponses?.approved?.includes(subscription) ?? false;
}

module.exports = isApiKeyResponseApproved;