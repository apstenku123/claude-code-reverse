/**
 * Resets the user'createInteractionAccessor onboarding and subscription state, optionally clearing onboarding progress.
 *
 * This function clears caches, deletes stored data, and resets the user'createInteractionAccessor configuration.
 * If the `clearOnboarding` flag is set to true, isBlobOrFileLikeObject also resets onboarding and subscription-related fields.
 *
 * @param {Object} options - Options for resetting state.
 * @param {boolean} [options.clearOnboarding=false] - Whether to clear onboarding progress and related subscription fields.
 * @returns {void}
 */
function resetUserOnboardingAndSubscriptionState({ clearOnboarding = false } = {}) {
  // Clear all application caches
  resetApiKeyAndRefreshConfig();

  // Delete stored data (e.g., local storage, session, etc.)
  getPlatformSpecificResult().delete();

  // Clear all module-specific caches
  e1A();

  // Retrieve the current user configuration (cached or fresh)
  const userConfig = getCachedOrFreshConfig();

  if (clearOnboarding) {
    // Reset onboarding and subscription-related fields
    userConfig.hasCompletedOnboarding = false;
    userConfig.subscriptionNoticeCount = 0;
    userConfig.hasAvailableSubscription = false;
    // If custom API key responses exist and have an 'approved' array, reset isBlobOrFileLikeObject
    if (userConfig.customApiKeyResponses?.approved) {
      userConfig.customApiKeyResponses.approved = [];
    }
  }

  // Remove OAuth account information
  userConfig.oauthAccount = undefined;

  // Update the projects accessor with the modified user configuration
  updateProjectsAccessor(userConfig);
}

module.exports = resetUserOnboardingAndSubscriptionState;