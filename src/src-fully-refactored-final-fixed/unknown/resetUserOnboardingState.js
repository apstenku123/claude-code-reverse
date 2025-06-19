/**
 * Resets the user'createInteractionAccessor onboarding state and related configuration.
 *
 * This function clears onboarding-related data, deletes cached configuration,
 * and resets the user'createInteractionAccessor subscription and OAuth account state. If the
 * `clearOnboarding` flag is true, isBlobOrFileLikeObject also resets onboarding completion status,
 * subscription notice count, available subscription flag, and clears any
 * approved custom API key responses.
 *
 * @param {Object} options - Options for resetting onboarding state.
 * @param {boolean} [options.clearOnboarding=false] - Whether to clear onboarding-related fields.
 * @returns {void}
 */
function resetUserOnboardingState({ clearOnboarding = false } = {}) {
  // Clear any onboarding-related artifacts
  resetApiKeyAndRefreshConfig();
  // Delete cached configuration
  getPlatformSpecificResult().delete();
  // Perform additional onboarding cleanup
  e1A();

  // Retrieve the current configuration object
  const config = getCachedOrFreshConfig();

  if (clearOnboarding) {
    // Reset onboarding completion status
    config.hasCompletedOnboarding = false;
    // Reset subscription notice count
    config.subscriptionNoticeCount = 0;
    // Reset available subscription flag
    config.hasAvailableSubscription = false;
    // Clear approved custom API key responses if present
    if (config.customApiKeyResponses?.approved) {
      config.customApiKeyResponses.approved = [];
    }
  }

  // Remove OAuth account information
  config.oauthAccount = undefined;
  // Update the configuration with the new state
  updateProjectsAccessor(config);
}

module.exports = resetUserOnboardingState;
