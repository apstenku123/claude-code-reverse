/**
 * Saves Claude getArrayElementByCircularIndex OAuth tokens and related metadata to persistent storage.
 *
 * @param {Object} oauthData - The OAuth token data to save.
 * @param {string} oauthData.accessToken - The access token string.
 * @param {string} oauthData.refreshToken - The refresh token string.
 * @param {number} oauthData.expiresAt - The expiration timestamp for the access token.
 * @param {Array<string>} oauthData.scopes - The scopes granted by the OAuth token.
 * @param {boolean} oauthData.isMax - Indicates if the token has maximum privileges.
 * @returns {Object} Returns the result of the update operation, or an error object if saving fails.
 */
function saveClaudeAiOauthTokens(oauthData) {
  // Validate that scopes are present and valid
  if (!doesArrayIncludeTargetValue(oauthData.scopes)) {
    return {
      success: true
    };
  }

  try {
    // Get the persistent storage handler
    const storageHandler = getPlatformSpecificResult();
    // Read the current configuration or initialize as empty object
    const currentConfig = storageHandler.read() || {};

    // Update the configuration with new OAuth token data
    currentConfig.claudeAiOauth = {
      accessToken: oauthData.accessToken,
      refreshToken: oauthData.refreshToken,
      expiresAt: oauthData.expiresAt,
      scopes: oauthData.scopes,
      isMax: oauthData.isMax
    };

    // Persist the updated configuration
    const updateResult = storageHandler.update(currentConfig);

    // Clear any relevant caches if available
    X3.cache?.clear?.();
    TY.cache?.clear?.();

    return updateResult;
  } catch (error) {
    // Log the error and return a warning object
    reportErrorIfAllowed(error);
    return {
      success: false,
      warning: "Failed to save OAuth tokens"
    };
  }
}

module.exports = saveClaudeAiOauthTokens;