/**
 * Determines if the Anthropic API key is missing from all possible sources.
 *
 * Checks for the presence of the Anthropic API key in the following order:
 *   1. Environment variables: CLAUDE_CODE_USE_BEDROCK or CLAUDE_CODE_USE_VERTEX
 *   2. mergeValidSubscriptions().apiKeyHelper (a helper function for retrieving the API key)
 *   3. Environment variable: ANTHROPIC_AUTH_TOKEN
 *   4. The source of the API key as returned by getAnthropicApiKeySource
 *
 * If none of these sources provide the API key, the function returns true (i.e., the key is missing).
 *
 * @returns {boolean} True if the Anthropic API key is missing from all sources, false otherwise.
 */
function isAnthropicApiKeyMissing() {
  // Check if either CLAUDE_CODE_USE_BEDROCK or CLAUDE_CODE_USE_VERTEX environment variables are set
  const isClaudeCodeProviderSet = process.env.CLAUDE_CODE_USE_BEDROCK || process.env.CLAUDE_CODE_USE_VERTEX;

  // Retrieve the API key helper from mergeValidSubscriptions
  const apiKeyHelper = mergeValidSubscriptions().apiKeyHelper;

  // Check if ANTHROPIC_AUTH_TOKEN environment variable is set, otherwise use the apiKeyHelper
  const anthropicAuthToken = process.env.ANTHROPIC_AUTH_TOKEN || apiKeyHelper;

  // Retrieve the source of the Anthropic API key using getAnthropicApiKeySource
  const { source: apiKeySource } = getAnthropicApiKeySource(v0A());

  // Return true if none of the sources provide the API key
  // apiKeySource can be 'ANTHROPIC_API_KEY' or 'apiKeyHelper' if those sources are used
  return !(
    isClaudeCodeProviderSet ||
    anthropicAuthToken ||
    apiKeySource === "ANTHROPIC_API_KEY" ||
    apiKeySource === "apiKeyHelper"
  );
}

module.exports = isAnthropicApiKeyMissing;