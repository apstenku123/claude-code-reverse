/**
 * Handles OAuth 2.0 client registration, token exchange, and authorization flow.
 *
 * This function manages the process of ensuring an OAuth client is registered, exchanging authorization codes for tokens,
 * refreshing tokens if possible, or redirecting the user to the authorization endpoint as needed.
 *
 * @async
 * @param {object} oauthClient - The OAuth client instance, providing methods for client information, token storage, etc.
 * @param {object} options - Configuration options for the authorization process.
 * @param {string} options.serverUrl - The OAuth server URL.
 * @param {string} [options.authorizationCode] - The authorization code to exchange for tokens, if available.
 * @returns {Promise<string>} - Returns 'AUTHORIZED' if authorization is complete, or 'REDIRECT' if user redirection is required.
 * @throws {Error} - Throws if required client information is missing when exchanging an authorization code, or if client information cannot be saved for dynamic registration.
 */
async function saveAuthorized(oauthClient, {
  serverUrl,
  authorizationCode
}) {
  // Fetch OAuth server metadata
  const serverMetadata = await fetchOAuthAuthorizationServerMetadata(serverUrl);
  // Retrieve existing client information (may be null/undefined)
  let clientInformation = await Promise.resolve(oauthClient.clientInformation());

  // If client information is missing, handle dynamic client registration
  if (!clientInformation) {
    if (authorizationCode !== undefined) {
      throw new Error("Existing OAuth client information is required when exchanging an authorization code");
    }
    if (!oauthClient.saveClientInformation) {
      throw new Error("OAuth client information must be saveable for dynamic registration");
    }
    // Register a new client dynamically
    const registeredClient = await registerDynamicClient(serverUrl, {
      metadata: serverMetadata,
      clientMetadata: oauthClient.clientMetadata
    });
    await oauthClient.saveClientInformation(registeredClient);
    clientInformation = registeredClient;
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

  // Attempt to use existing refresh token to obtain new tokens
  const tokens = await oauthClient.tokens();
  if (tokens?.refresh_token) {
    try {
      const refreshedTokens = await refreshAccessToken(serverUrl, {
        metadata: serverMetadata,
        clientInformation,
        refreshToken: tokens.refresh_token
      });
      await oauthClient.saveTokens(refreshedTokens);
      return "AUTHORIZED";
    } catch (error) {
      console.error("Could not refresh OAuth tokens:", error);
      // Proceed to authorization redirect if refresh fails
    }
  }

  // No valid tokens, initiate authorization code flow
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

module.exports = saveAuthorized;
