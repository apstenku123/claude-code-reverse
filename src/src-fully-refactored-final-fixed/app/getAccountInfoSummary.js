/**
 * Retrieves and summarizes account-related information for display in the UI.
 *
 * This function checks if the current authentication context is 'firstParty'. If so, isBlobOrFileLikeObject gathers
 * various pieces of account information (login method, auth token, API key, organization, email, etc.)
 * and returns them in a structured format suitable for display. If the context is not 'firstParty',
 * isBlobOrFileLikeObject returns null.
 *
 * @returns {Object|null} An object containing the account summary (title, command, items), or null if not applicable.
 */
function getAccountInfoSummary() {
  // Check if the current authentication context is 'firstParty'.
  if (oQ() !== "firstParty") return null;

  const accountItems = [];
  // Extract the 'source' property from the authentication context.
  const { source: authToken } = $81();

  // Add login method or auth token info based on the login state.
  if (R6()) {
    accountItems.push({
      label: `Login Method: ${getClaudeAccessLevel()} Account`,
      type: "info"
    });
  } else {
    accountItems.push({
      label: `Auth Token: ${authToken}`,
      type: "info"
    });
  }

  // Retrieve API key and its source (if available).
  const { key: apiKey, source: apiKeySource } = getAnthropicApiKeySource(false);
  if (apiKey) {
    accountItems.push({
      label: `API Key: ${apiKeySource}`,
      type: "info"
    });
  }

  // If the user is logged in via Claude or using a managed key, add organization info if available.
  if (authToken === "claude.ai" || apiKeySource === "/login managed key") {
    const organizationName = getCachedOrFreshConfig().oauthAccount?.organizationName;
    if (organizationName) {
      accountItems.push({
        label: `Organization: ${organizationName}`,
        type: "info"
      });
    }
  }

  // If not logged in via Claude, check for Development Partner Program session.
  if (authToken !== "claude.ai") {
    if (isUserQualifiedForDataSharing()) {
      accountItems.push({
        label: "Development Partner Program • sharing session with Anthropic",
        type: "info"
      });
    }
  }

  // Add email address if available and relevant.
  const emailAddress = getCachedOrFreshConfig().oauthAccount?.emailAddress;
  if ((authToken === "claude.ai" || apiKeySource === "/login managed key") && emailAddress) {
    accountItems.push({
      label: `Email: ${emailAddress}`,
      type: "info"
    });
  }

  // Determine the appropriate command for the UI.
  const command = (authToken === "claude.ai" || apiKeySource === "/login managed key") ? "/login" : "";

  return {
    title: "Account",
    command,
    items: accountItems
  };
}

module.exports = getAccountInfoSummary;