/**
 * Determines if the managed key login page should be shown for a first-party OAuth organization.
 *
 * This function checks if the current authentication context is 'firstParty', ensures that a certain
 * restriction (checked by isRestrictedEnvironment) is not active, and verifies that the source of the
 * API key is '/login managed key' and that an organization UUID is present in the OAuth account config.
 *
 * @returns {boolean} True if the managed key login page should be shown, false otherwise.
 */
function shouldShowManagedKeyLogin() {
  // Check if the authentication context is 'firstParty'
  if (getAuthContext() !== "firstParty") return false;

  // Check if the environment is restricted (e.g., some feature flag or environment limitation)
  if (isRestrictedEnvironment()) return false;

  // Retrieve the source of the Anthropic API key
  const { source: apiKeySource } = getAnthropicApiKeySource(false);

  // Retrieve the organization UUID from the OAuth account configuration
  const organizationUuid = getCachedOrFreshConfig().oauthAccount?.organizationUuid;

  // Only show the managed key login if the source is '/login managed key' and the organization UUID exists
  if (apiKeySource !== "/login managed key" || !organizationUuid) return false;

  return true;
}

module.exports = shouldShowManagedKeyLogin;