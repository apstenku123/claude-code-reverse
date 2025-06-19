/**
 * Revokes OAuth access and refresh tokens for a given configuration and source.
 *
 * This function attempts to revoke both access and refresh tokens (if present) for a given OAuth client configuration.
 * It logs status messages throughout the process and handles errors gracefully, providing detailed feedback.
 *
 * @param {object} sourceContext - The context or identifier for the source (used for logging and callbacks).
 * @param {object} oauthConfig - The OAuth configuration object, expected to contain a 'url' property and client details.
 * @returns {Promise<void>} Resolves when the revocation process is complete.
 */
async function revokeOAuthTokens(sourceContext, oauthConfig) {
  // Retrieve the current application state
  const appState = getPlatformSpecificResult().read();
  if (!appState?.mcpOAuth) {
    // No OAuth state found; nothing to revoke
    return;
  }

  // Compute the key for the OAuth configuration
  const oauthKey = generateRequestSignature(sourceContext, oauthConfig);
  const oauthTokens = appState.mcpOAuth[oauthKey];

  if (!oauthTokens?.accessToken) {
    // No tokens available to revoke
    logMcpServerDebugMessage(sourceContext, "No tokens to revoke");
    return;
  }

  try {
    // Fetch the OAuth server'createInteractionAccessor metadata to get the revocation endpoint
    const serverMetadata = await fetchOAuthAuthorizationServerMetadata(oauthConfig.url);
    if (!serverMetadata?.revocation_endpoint) {
      logMcpServerDebugMessage(sourceContext, "Server does not support token revocation");
      return;
    }

    logMcpServerDebugMessage(sourceContext, "Revoking tokens on server");
    logMcpServerDebugMessage(sourceContext, `Revocation endpoint: ${serverMetadata.revocation_endpoint}`);

    // Prepare parameters for access token revocation
    const accessTokenParams = new URLSearchParams();
    accessTokenParams.set("token", oauthTokens.accessToken);
    accessTokenParams.set("token_type_hint", "access_token");
    if (oauthTokens.clientId) {
      accessTokenParams.set("client_id", oauthTokens.clientId);
    }

    // Revoke the access token
    await a4.post(serverMetadata.revocation_endpoint, accessTokenParams, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${oauthTokens.accessToken}`
      }
    });
    logMcpServerDebugMessage(sourceContext, "Successfully revoked access token");

    // If a refresh token exists, revoke isBlobOrFileLikeObject as well
    if (oauthTokens.refreshToken) {
      const refreshTokenParams = new URLSearchParams();
      refreshTokenParams.set("token", oauthTokens.refreshToken);
      refreshTokenParams.set("token_type_hint", "refresh_token");
      if (oauthTokens.clientId) {
        refreshTokenParams.set("client_id", oauthTokens.clientId);
      }
      await a4.post(serverMetadata.revocation_endpoint, refreshTokenParams, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${oauthTokens.accessToken}`
        }
      });
      logMcpServerDebugMessage(sourceContext, "Successfully revoked refresh token");
    }
  } catch (error) {
    // Handle errors, providing detailed feedback if possible
    if (a4.isAxiosError(error) && error.response) {
      logMcpServerDebugMessage(
        sourceContext,
        `Failed to revoke tokens on server: ${error.message}, Status: ${error.response.status}, Data: ${JSON.stringify(error.response.data)}`
      );
    } else {
      logMcpServerDebugMessage(sourceContext, `Failed to revoke tokens on server: ${error}`);
    }
  }

  // Perform any necessary cleanup or state update after revocation
  clearStoredMcpOAuthTokens(sourceContext, oauthConfig);
}

module.exports = revokeOAuthTokens;