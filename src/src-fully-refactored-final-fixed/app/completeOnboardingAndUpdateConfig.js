/**
 * Marks onboarding as completed and updates the configuration with the latest onboarding version.
 *
 * Retrieves the current configuration (from cache or disk),
 * merges onboarding completion flags and version info, and updates the accessor.
 *
 * @returns {void} No return value.
 */
function completeOnboardingAndUpdateConfig() {
  // Retrieve the current configuration (cached or fresh)
  const currentConfig = getCachedOrFreshConfig();

  // Define the latest onboarding version information
  const onboardingVersionInfo = {
    ISSUES_EXPLAINER: "report the issue at https://github.com/anthropics/claude-code/issues",
    PACKAGE_URL: "@anthropic-ai/claude-code",
    README_URL: "https://docs.anthropic.com/createInteractionAccessor/claude-code",
    VERSION: "1.0.19"
  };

  // Update the configuration to mark onboarding as completed and set the latest version
  updateProjectsAccessor({
    ...currentConfig,
    hasCompletedOnboarding: true,
    lastOnboardingVersion: onboardingVersionInfo.VERSION
  });
}

module.exports = completeOnboardingAndUpdateConfig;