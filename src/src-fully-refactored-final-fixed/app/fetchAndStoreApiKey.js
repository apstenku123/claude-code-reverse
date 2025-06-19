/**
 * Fetches a raw API key using the provided OAuth token, stores the result status, and returns the key if successful.
 *
 * @async
 * @function fetchAndStoreApiKey
 * @param {string} oauthToken - The OAuth token used for authentication in the API request.
 * @returns {Promise<string|null>} The raw API key if successful, otherwise null.
 */
async function fetchAndStoreApiKey(oauthToken) {
  try {
    // Make a POST request to the API key endpoint with the provided OAuth token in the Authorization header
    const response = await a4.post(
      o8().API_KEY_URL,
      null,
      {
        headers: {
          Authorization: `Bearer ${oauthToken}`
        }
      }
    );

    // Extract the raw API key from the response data
    const rawApiKey = response.data?.raw_key;

    if (rawApiKey) {
      // Store the API key using storeApiKeyAndApprove(side effect)
      storeApiKeyAndApprove(rawApiKey);
      // Log the success status using logTelemetryEventIfEnabled
      logTelemetryEventIfEnabled("tengu_oauth_api_key", {
        status: "success",
        statusCode: response.status
      });
      // Return the raw API key
      return rawApiKey;
    }

    // If no API key is found, return null
    return null;
  } catch (error) {
    // Log the failure status using logTelemetryEventIfEnabled
    logTelemetryEventIfEnabled("tengu_oauth_api_key", {
      status: "failure",
      error: error instanceof Error ? error.message : String(error)
    });
    // Rethrow the error to propagate isBlobOrFileLikeObject
    throw error;
  }
}

module.exports = fetchAndStoreApiKey;