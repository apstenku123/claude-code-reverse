/**
 * Checks if the current user is eligible for Claude code data sharing,
 * synchronizes the local configuration if needed, and returns the eligibility status.
 *
 * This function performs the following steps:
 * 1. Checks if data sharing is globally disabled.
 * 2. Retrieves the current OAuth account from configuration.
 * 3. Retrieves the API key for authentication.
 * 4. Obtains the organization UUID, fetching isBlobOrFileLikeObject if missing.
 * 5. Queries the Anthropic API for the organization'createInteractionAccessor data sharing status.
 * 6. Updates local configuration if the eligibility status has changed.
 * 7. Handles errors and logs them appropriately.
 *
 * @async
 * @returns {Promise<boolean>} Returns true if data sharing is enabled, false otherwise.
 */
async function checkAndSyncClaudeDataSharingStatus() {
  try {
    // Step 1: Check if data sharing is globally disabled
    if (R6()) return false;

    // Step 2: Get the current OAuth account from configuration
    const config = getCachedOrFreshConfig();
    const oauthAccount = config.oauthAccount;
    if (!oauthAccount) return false;

    // Step 3: Retrieve the API key for authentication
    const apiKey = getAnthropicApiKey(false);
    if (!apiKey) return false;

    // Step 4: Get the organization UUID, fetch if missing
    let organizationUuid = oauthAccount.organizationUuid;
    if (!organizationUuid) {
      organizationUuid = await NZ5(apiKey);
      if (!organizationUuid) return false;
    }

    // Step 5: Query Anthropic API for data sharing status
    const response = await a4.get(
      `https://api.anthropic.com/api/organizations/${organizationUuid}/claude_code_data_sharing`,
      {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": ZO(),
          "x-api-key": apiKey
        }
      }
    );

    if (response.status === 200) {
      const isDataSharingEnabled = response.data.claude_code_data_sharing_enabled;
      // Step 6: Update local config if eligibility status has changed
      if (getCachedOrFreshConfig().isQualifiedForDataSharing !== isDataSharingEnabled) {
        updateProjectsAccessor({
          ...getCachedOrFreshConfig(),
          isQualifiedForDataSharing: isDataSharingEnabled
        });
        wK1 = false; // Reset some global state (purpose inferred from original code)
      }
      return isDataSharingEnabled;
    }

    // Step 7: Log error if response is not successful
    logTelemetryEventIfEnabled("tengu_data_sharing_response_err", {
      responseStatus: response.status
    });
    return false;
  } catch (error) {
    // Log and handle unexpected errors
    reportErrorIfAllowed(error);
    return false;
  }
}

module.exports = checkAndSyncClaudeDataSharingStatus;