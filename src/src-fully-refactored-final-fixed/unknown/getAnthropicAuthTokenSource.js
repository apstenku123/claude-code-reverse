/**
 * Determines the source and presence of an Anthropic authentication token.
 * Checks for the token in environment variables, via a helper function, or in the current session config.
 *
 * @returns {{ source: string, hasToken: boolean }} An object indicating the token source and whether a token is present.
 */
function getAnthropicAuthTokenSource() {
  // Check if the token is set as an environment variable
  if (process.env.ANTHROPIC_AUTH_TOKEN) {
    return {
      source: "ANTHROPIC_AUTH_TOKEN",
      hasToken: true
    };
  }

  // Check if the token is available via the API key helper
  if (isApiKeyHelperAvailable()) {
    return {
      source: "apiKeyHelper",
      hasToken: true
    };
  }

  // Retrieve the current session configuration
  const sessionConfig = getCurrentSessionConfig();

  // Check if the session config has valid scopes and an access token
  if (areScopesValid(sessionConfig?.scopes) && sessionConfig?.accessToken) {
    return {
      source: "claude.ai",
      hasToken: true
    };
  }

  // No token found in any source
  return {
    source: "none",
    hasToken: false
  };
}

// Dependency function placeholders (should be implemented elsewhere in your codebase)
// function isApiKeyHelperAvailable() { ... }
// function getCurrentSessionConfig() { ... }
// function areScopesValid(scopes) { ... }

module.exports = getAnthropicAuthTokenSource;