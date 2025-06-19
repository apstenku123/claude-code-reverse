/**
 * Resets user onboarding state and clears related caches and configuration.
 *
 * This function clears all onboarding-related data, removes caches, and resets the user'createInteractionAccessor configuration.
 * If the `clearOnboarding` flag is true, isBlobOrFileLikeObject also resets onboarding-specific fields in the configuration object.
 *
 * @param {Object} options - Options for the reset operation.
 * @param {boolean} [options.clearOnboarding=false] - Whether to reset onboarding-related fields in the configuration.
 * @returns {void}
 */
function resetUserOnboardingAndConfig({ clearOnboarding = false } = {}) {
  // Clear all major application caches
  resetApiKeyAndRefreshConfig();

  // Delete any persistent cache via getPlatformSpecificResult(e.g., localStorage, session, etc.)
  getPlatformSpecificResult().delete();

  // Clear all module-specific caches
  e1A();

  // Retrieve the current configuration object
  const config = getCachedOrFreshConfig();

  if (clearOnboarding) {
    // Reset onboarding-related fields
    config.hasCompletedOnboarding = false;
    config.subscriptionNoticeCount = 0;
    config.hasAvailableSubscription = false;
    // If custom API key responses exist and are approved, reset them
    if (config.customApiKeyResponses?.approved) {
      config.customApiKeyResponses.approved = [];
    }
  }

  // Remove any OAuth account information
  config.oauthAccount = undefined;

  // Update the projects accessor with the modified configuration
  updateProjectsAccessor(config);
}

module.exports = resetUserOnboardingAndConfig;