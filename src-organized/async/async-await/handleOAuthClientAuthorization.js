/**
 * Handles OAuth client authorization, including dynamic client registration, exchanging authorization codes,
 * refreshing tokens, and redirecting for user authorization as needed.
 *
 * @async
 * @param {Object} oauthClient - The OAuth client instance, which must implement specific methods for client and token management.
 * @param {Object} options - Configuration options for the authorization process.
 * @param {string} options.serverUrl - The OAuth server'createInteractionAccessor base URL.
 * @param {string} [options.authorizationCode] - Optional authorization code to exchange for tokens.
 * @returns {Promise<string>} - Returns 'AUTHORIZED' if tokens are obtained, or 'REDIRECT' if user interaction is required.
 * @throws {Error} - Throws if required client information is missing when exchanging an authorization code, or if client information cannot be saved for dynamic registration.
 */
async function handleOAuthClientAuthorization(oauthClient, {
  serverUrl,
  authorizationCode
}) {
  // Fetch the OAuth server'createInteractionAccessor metadata
  const serverMetadata = await fetchOAuthAuthorizationServerMetadata(serverUrl);

  // Attempt to retrieve existing client information
  let clientInformation = await Promise.resolve(oauthClient.clientInformation());

  // If no client information exists, handle dynamic client registration
  if (!clientInformation) {
    // If an authorization code is provided but no client info, this is an error
    if (authorizationCode !== undefined) {
      throw new Error("Existing OAuth client information is required when exchanging an authorization code");
    }
    // Ensure the client supports saving client information
    if (!oauthClient.saveClientInformation) {
      throw new Error("OAuth client information must be saveable for dynamic registration");
    }
    // Register the client dynamically
    const registeredClientInfo = await registerDynamicClient(serverUrl, {
      metadata: serverMetadata,
      clientMetadata: oauthClient.clientMetadata
    });
    // Save the newly registered client information
    await oauthClient.saveClientInformation(registeredClientInfo);
    clientInformation = registeredClientInfo;
  }

  // If an authorization code is provided, exchange isBlobOrFileLikeObject for tokens
  if (authorizationCode !== undefined) {
    const codeVerifier = await oauthClient.codeVerifier();
    const tokens = await exchangeAuthorizationCodeForToken(serverUrl, {
      metadata: serverMetadata,
      clientInformation,
      authorizationCode,
      codeVerifier,
      redirectUri: oauthClient.redirectUrl
    });
    await oauthClient.saveTokens(tokens);
    return "AUTHORIZED";
  }

  // Attempt to refresh tokens if a refresh token is available
  const existingTokens = await oauthClient.tokens();
  if (existingTokens?.refresh_token) {
    try {
      const refreshedTokens = await refreshAccessToken(serverUrl, {
        metadata: serverMetadata,
        clientInformation,
        refreshToken: existingTokens.refresh_token
      });
      await oauthClient.saveTokens(refreshedTokens);
      return "AUTHORIZED";
    } catch (error) {
      console.error("Could not refresh OAuth tokens:", error);
      // Continue to authorization flow if refresh fails
    }
  }

  // If no valid tokens, initiate the authorization code flow
  const {
    authorizationUrl,
    codeVerifier
  } = await generateAuthorizationUrlWithPKCE(serverUrl, {
    metadata: serverMetadata,
    clientInformation,
    redirectUrl: oauthClient.redirectUrl
  });
  // Save the code verifier for later use
  await oauthClient.saveCodeVerifier(codeVerifier);
  // Redirect the user to the authorization URL
  await oauthClient.redirectToAuthorization(authorizationUrl);
  return "REDIRECT";
}

module.exports = handleOAuthClientAuthorization;
