/**
 * Extracts the 'key' property from the configuration object returned by getAnthropicApiKeySource for a given observable.
 *
 * @param {Object} sourceObservable - The observable or source object to extract the key from.
 * @returns {string} The 'key' property from the configuration object.
 */
function getKeyFromObservableConfig(sourceObservable) {
  // Call getAnthropicApiKeySource to get the configuration object for the provided observable
  const { key } = getAnthropicApiKeySource(sourceObservable);
  // Return the extracted key
  return key;
}

module.exports = getKeyFromObservableConfig;