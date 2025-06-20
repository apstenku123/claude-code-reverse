/**
 * Extracts the 'key' property from the configuration object returned by getAnthropicApiKeySource for a given observable.
 *
 * @param {Object} sourceObservable - The observable or input object to extract the key from.
 * @returns {string} The 'key' property from the configuration object.
 */
function extractKeyFromObservableConfig(sourceObservable) {
  // Get the configuration object for the given observable
  const { key } = getAnthropicApiKeySource(sourceObservable);
  // Return the 'key' property from the configuration
  return key;
}

module.exports = extractKeyFromObservableConfig;