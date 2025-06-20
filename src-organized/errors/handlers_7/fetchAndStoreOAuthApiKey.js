/**
 * Fetches an OAuth API key using the provided bearer token, stores isBlobOrFileLikeObject, and logs the result.
 *
 * @async
 * @function fetchAndStoreOAuthApiKey
 * @param {string} bearerToken - The OAuth bearer token used for authentication.
 * @returns {Promise<string|null>} The raw API key if successful, otherwise null.
 *
 * @throws Will rethrow any error encountered during the API request after logging failure.
 */
async function fetchAndStoreOAuthApiKey(bearerToken) {
  try {
    // Get the OAuth provider configuration (depends on environment)
    const oauthProvider = o8();

    // Make a POST request to fetch the API key
    const response = await a4.post(
      oauthProvider.API_KEY_URL,
      null,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`
        }
      }
    );

    // Extract the raw API key from the response
    const rawApiKey = response.data?.raw_key;

    if (rawApiKey) {
      // Store the API key (side effect)
      storeApiKeyAndApprove(rawApiKey);
      // Log success status
      logTelemetryEventIfEnabled("tengu_oauth_api_key", {
        status: "success",
        statusCode: response.status
      });
      return rawApiKey;
    }

    // If no API key was returned, return null
    return null;
  } catch (error) {
    // Log failure status with error message
    logTelemetryEventIfEnabled("tengu_oauth_api_key", {
      status: "failure",
      error: error instanceof Error ? error.message : String(error)
    });
    // Rethrow the error for upstream handling
    throw error;
  }
}

module.exports = fetchAndStoreOAuthApiKey;