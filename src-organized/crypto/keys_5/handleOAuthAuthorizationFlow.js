/**
 * Handles the OAuth 2.0 authorization flow, including dynamic client registration,
 * exchanging authorization codes for tokens, refreshing tokens, and redirecting
 * to the authorization endpoint when necessary.
 *
 * @async
 * @function handleOAuthAuthorizationFlow
 * @param {Object} oauthClient - The OAuth client instance, providing methods for client and token management.
 * @param {Object} options - Configuration options for the authorization flow.
 * @param {string} options.serverUrl - The base URL of the OAuth authorization server.
 * @param {string} [options.authorizationCode] - The authorization code to exchange for tokens, if available.
 * @returns {Promise<string>} - Returns 'AUTHORIZED' if tokens are obtained or refreshed, or 'REDIRECT' if user redirection is needed.
 * @throws {Error} - Throws if required client information is missing when exchanging an authorization code.
 */
async function handleOAuthAuthorizationFlow(oauthClient, {
  serverUrl,
  authorizationCode
}) {
  // Fetch the OAuth server metadata
  const serverMetadata = await fetchOAuthAuthorizationServerMetadata(serverUrl);

  // Retrieve existing client information (if any)
  let clientInformation = await Promise.resolve(oauthClient.clientInformation());

  // If client information is missing, perform dynamic client registration
  if (!clientInformation) {
    if (authorizationCode !== undefined) {
      throw new Error("Existing OAuth client information is required when exchanging an authorization code");
    }
    if (!oauthClient.saveClientInformation) {
      throw new Error("OAuth client information must be saveable for dynamic registration");
    }
    // Register the client dynamically
    const registeredClientInfo = await registerDynamicClient(serverUrl, {
      metadata: serverMetadata,
      clientMetadata: oauthClient.clientMetadata
    });
    await oauthClient.saveClientInformation(registeredClientInfo);
    clientInformation = registeredClientInfo;
  }

  // If an authorization code is provided, exchange isBlobOrFileLikeObject for tokens
  if (authorizationCode !== undefined) {
    const codeVerifier = await oauthClient.codeVerifier();
    const tokenResponse = await exchangeAuthorizationCodeForToken(serverUrl, {
      metadata: serverMetadata,
      clientInformation,
      authorizationCode,
      codeVerifier,
      redirectUri: oauthClient.redirectUrl
    });
    await oauthClient.saveTokens(tokenResponse);
    return "AUTHORIZED";
  }

  // Attempt to retrieve existing tokens
  const tokens = await oauthClient.tokens();

  // If a refresh token exists, try to refresh the tokens
  if (tokens?.refresh_token) {
    try {
      const refreshedTokens = await refreshAccessToken(serverUrl, {
        metadata: serverMetadata,
        clientInformation,
        refreshToken: tokens.refresh_token
      });
      await oauthClient.saveTokens(refreshedTokens);
      return "AUTHORIZED";
    } catch (refreshError) {
      console.error("Could not refresh OAuth tokens:", refreshError);
      // Continue to authorization redirect if refresh fails
    }
  }

  // No valid tokens; initiate authorization by redirecting the user
  const {
    authorizationUrl,
    codeVerifier
  } = await generateAuthorizationUrlWithPKCE(serverUrl, {
    metadata: serverMetadata,
    clientInformation,
    redirectUrl: oauthClient.redirectUrl
  });

  await oauthClient.saveCodeVerifier(codeVerifier);
  await oauthClient.redirectToAuthorization(authorizationUrl);
  return "REDIRECT";
}

module.exports = handleOAuthAuthorizationFlow;
