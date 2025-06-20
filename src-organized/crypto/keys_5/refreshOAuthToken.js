/**
 * Refreshes an OAuth token using a refresh token and returns new token details.
 *
 * @async
 * @function refreshOAuthToken
 * @param {string} refreshToken - The refresh token used to obtain a new access token.
 * @returns {Promise<Object>} An object containing the new access token, refresh token, expiration time, scopes, and a boolean indicating if the token is at maximum privileges.
 * @throws {Error} Throws an error if the token refresh fails.
 */
async function refreshOAuthToken(refreshToken) {
  // Prepare the request payload for the token refresh
  const tokenRequestPayload = {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: o8().CLIENT_ID
  };

  try {
    // Make the POST request to the token endpoint
    const response = await a4.post(o8().TOKEN_URL, tokenRequestPayload, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    // Check if the response status is successful
    if (response.status !== 200) {
      throw new Error(`Token refresh failed: ${response.statusText}`);
    }

    // Extract token data from the response
    const {
      access_token: accessToken,
      refresh_token: newRefreshToken = refreshToken, // fallback to input if not provided
      expires_in: expiresInSeconds,
      scope: scopeString
    } = response.data;

    // Calculate the expiration timestamp (in ms)
    const expiresAt = Date.now() + expiresInSeconds * 1000;

    // Parse the scopes using the provided utility
    const scopes = splitStringIntoWords(scopeString);

    // Log the successful token refresh event
    logTelemetryEventIfEnabled("tengu_oauth_token_refresh_success", {});

    // Check if the new access token has maximum privileges
    const isMax = await XT1(accessToken);

    // Return the refreshed token details
    return {
      accessToken,
      refreshToken: newRefreshToken,
      expiresAt,
      scopes,
      isMax
    };
  } catch (error) {
    // Log the failure event before throwing the error
    logTelemetryEventIfEnabled("tengu_oauth_token_refresh_failure", {});
    throw error;
  }
}

module.exports = refreshOAuthToken;