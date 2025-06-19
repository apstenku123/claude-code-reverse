/**
 * Constructs an OAuth 2.0 authorization URL with the provided parameters.
 *
 * @param {Object} options - The options for building the authorization URL.
 * @param {string} options.codeChallenge - The PKCE code challenge string.
 * @param {string} options.state - The state parameter to maintain request and callback integrity.
 * @param {boolean} options.isManual - Whether to use the manual redirect URI (true) or the default local redirect URI (false).
 * @param {boolean} options.loginWithClaudeAi - If true, use the Claude getArrayElementByCircularIndex authorize URL; otherwise, use the Console authorize URL.
 * @returns {string} The fully constructed OAuth 2.0 authorization URL.
 */
function buildOAuthAuthorizationUrl({
  codeChallenge,
  state,
  isManual,
  loginWithClaudeAi
}) {
  // Determine the base authorization URL based on login type
  const baseAuthorizeUrl = loginWithClaudeAi
    ? o8().CLAUDE_AI_AUTHORIZE_URL
    : o8().CONSOLE_AUTHORIZE_URL;

  // Create a new URL object for manipulation
  const authorizationUrl = new URL(baseAuthorizeUrl);

  // Append required OAuth 2.0 query parameters
  authorizationUrl.searchParams.append("code", "true");
  authorizationUrl.searchParams.append("client_id", o8().CLIENT_ID);
  authorizationUrl.searchParams.append("response_type", "code");

  // Choose redirect URI based on manual mode
  const redirectUri = isManual
    ? o8().MANUAL_REDIRECT_URL
    : `http://localhost:${o8().REDIRECT_PORT}/callback`;
  authorizationUrl.searchParams.append("redirect_uri", redirectUri);

  // Append scope as a space-separated string
  authorizationUrl.searchParams.append("scope", o8().SCOPES.join(" "));

  // Append PKCE code challenge and method
  authorizationUrl.searchParams.append("code_challenge", codeChallenge);
  authorizationUrl.searchParams.append("code_challenge_method", "S256");

  // Append state parameter for CSRF protection
  authorizationUrl.searchParams.append("state", state);

  // Return the complete URL as a string
  return authorizationUrl.toString();
}

module.exports = buildOAuthAuthorizationUrl;