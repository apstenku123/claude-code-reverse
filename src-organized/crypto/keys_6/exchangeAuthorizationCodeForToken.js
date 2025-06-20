/**
 * Exchanges an OAuth2 authorization code for an access token using the configured OAuth provider.
 *
 * @async
 * @function exchangeAuthorizationCodeForToken
 * @param {string} authorizationCode - The authorization code received from the OAuth2 provider after user authentication.
 * @param {string} state - The state parameter used to prevent CSRF attacks, should match the one sent in the initial authorization request.
 * @param {string} codeVerifier - The PKCE code verifier used in the initial authorization request.
 * @param {boolean} [useManualRedirect=false] - If true, uses the manual redirect URI from configuration; otherwise, uses the local callback URI.
 * @returns {Promise<Object>} The token response data from the OAuth2 provider.
 * @throws {Error} Throws an error if the token exchange fails or if authentication is invalid.
 */
async function exchangeAuthorizationCodeForToken(
  authorizationCode,
  state,
  codeVerifier,
  useManualRedirect = false
) {
  // Build the payload for the token exchange request
  const oauthConfig = o8();
  const tokenRequestPayload = {
    grant_type: "authorization_code",
    code: authorizationCode,
    redirect_uri: useManualRedirect
      ? oauthConfig.MANUAL_REDIRECT_URL
      : `http://localhost:${oauthConfig.REDIRECT_PORT}/callback`,
    client_id: oauthConfig.CLIENT_ID,
    code_verifier: codeVerifier,
    state: state
  };

  // Make the POST request to exchange the authorization code for tokens
  const tokenResponse = await a4.post(
    oauthConfig.TOKEN_URL,
    tokenRequestPayload,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  // Handle unsuccessful responses
  if (tokenResponse.status !== 200) {
    if (tokenResponse.status === 401) {
      throw new Error("Authentication failed: Invalid authorization code");
    }
    throw new Error(
      `Token exchange failed (${tokenResponse.status}): ${tokenResponse.statusText}`
    );
  }

  // Return the token data from the response
  return tokenResponse.data;
}

module.exports = exchangeAuthorizationCodeForToken;