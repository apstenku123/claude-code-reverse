/**
 * Fetches the Claude CLI profile for the current OAuth account using the provided API key.
 *
 * @async
 * @function fetchClaudeCliProfile
 * @param {any} sourceContext - The context or object used to extract the API key (x-api-key) via getAnthropicApiKey.
 * @returns {Promise<any|undefined>} Resolves with the Claude CLI profile data if successful, otherwise undefined.
 */
async function fetchClaudeCliProfile(sourceContext) {
  // Retrieve the current configuration, which includes oauthAccount
  const config = getCachedOrFreshConfig();
  // Extract the account UUID from the oauthAccount, if available
  const accountUuid = config.oauthAccount?.accountUuid;
  // Extract the API key from the source context
  const apiKey = startUiActionClickTransaction(sourceContext);

  // If either the account UUID or API key is missing, exit early
  if (!accountUuid || !apiKey) {
    return;
  }

  // Build the API endpoint URL
  const baseApiUrl = getApiConfig().BASE_API_URL;
  const profileEndpoint = `${baseApiUrl}/api/claude_cli_profile`;

  try {
    // Make the GET request to fetch the profile
    const response = await apiClient.get(profileEndpoint, {
      headers: {
        "x-api-key": apiKey,
        "anthropic-beta": anthropicBetaHeader
      },
      params: {
        account_uuid: accountUuid
      }
    });
    // Return the profile data from the response
    return response.data;
  } catch (error) {
    // Handle any errors that occur during the request
    handleApiError(error);
  }
}

module.exports = fetchClaudeCliProfile;