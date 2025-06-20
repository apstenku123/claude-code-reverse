/**
 * Determines if the managed key login page should be shown for a first-party organization.
 *
 * This function checks if the current context is 'firstParty', ensures a certain condition (R6) is not met,
 * verifies that the API key source is '/login managed key', and that an organization UUID exists in the OAuth account.
 *
 * @returns {boolean} True if the managed key login page should be shown for a first-party organization, false otherwise.
 */
function shouldShowManagedKeyLoginForFirstParty() {
  // Check if the current context is 'firstParty'
  if (oQ() !== "firstParty") {
    return false;
  }

  // Check if the R6 condition is met (if so, do not show the login)
  if (R6()) {
    return false;
  }

  // Retrieve the source of the Anthropic API key
  const { source: apiKeySource } = getAnthropicApiKeySource(false);

  // Retrieve the organization UUID from the OAuth account in the config
  const organizationUuid = getCachedOrFreshConfig().oauthAccount?.organizationUuid;

  // Only show the managed key login if the source is '/login managed key' and an organization UUID exists
  if (apiKeySource !== "/login managed key" || !organizationUuid) {
    return false;
  }

  return true;
}

module.exports = shouldShowManagedKeyLoginForFirstParty;