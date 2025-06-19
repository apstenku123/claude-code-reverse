/**
 * Retrieves the Anthropic API key from the provided source.
 *
 * This function extracts the API key by calling getAnthropicApiKeySource,
 * which returns an object containing the key and its source. Only the key is returned.
 *
 * @param {any} sourceInput - The input used to determine where to retrieve the API key from.
 * @returns {string} The Anthropic API key.
 */
function getAnthropicApiKey(sourceInput) {
  // Destructure the 'key' property from the result of getAnthropicApiKeySource
  const { key: anthropicApiKey } = getAnthropicApiKeySource(sourceInput);
  return anthropicApiKey;
}

module.exports = getAnthropicApiKey;