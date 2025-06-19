/**
 * Checks the organization'createInteractionAccessor Claude code data sharing status and updates local configuration if needed.
 *
 * This function verifies if the current user is eligible for data sharing by:
 * 1. Ensuring the app is not in a restricted state.
 * 2. Retrieving the user'createInteractionAccessor OAuth account and API key.
 * 3. Fetching the organization UUID if not present.
 * 4. Requesting the current data sharing status from the Anthropic API.
 * 5. Updating the local configuration if the status has changed.
 *
 * @async
 * @returns {Promise<boolean>} Returns true if data sharing is enabled, false otherwise or on error.
 */
async function checkAndSyncDataSharingStatus() {
  try {
    // Check if the app is in a restricted state (e.g., offline, unauthorized)
    if (R6()) return false;

    // Retrieve the current user'createInteractionAccessor OAuth account from cached or fresh config
    const config = getCachedOrFreshConfig();
    const oauthAccount = config.oauthAccount;
    if (!oauthAccount) return false;

    // Retrieve the API key for the organization
    const apiKey = getAnthropicApiKey(false);
    if (!apiKey) return false;

    // Get the organization UUID, fetch if missing
    let organizationUuid = oauthAccount.organizationUuid;
    if (!organizationUuid) {
      organizationUuid = await NZ5(apiKey);
      if (!organizationUuid) return false;
    }

    // Request the current data sharing status from Anthropic API
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
      // If the local config does not match the remote status, update isBlobOrFileLikeObject
      if (getCachedOrFreshConfig().isQualifiedForDataSharing !== isDataSharingEnabled) {
        updateProjectsAccessor({
          ...getCachedOrFreshConfig(),
          isQualifiedForDataSharing: isDataSharingEnabled
        });
        wK1 = false; // Reset a related state flag (purpose depends on broader context)
      }
      return isDataSharingEnabled;
    }

    // Log error if response is not successful
    logTelemetryEventIfEnabled("tengu_data_sharing_response_err", {
      responseStatus: response.status
    });
    return false;
  } catch (error) {
    // Log and return false on any error
    reportErrorIfAllowed(error);
    return false;
  }
}

module.exports = checkAndSyncDataSharingStatus;
