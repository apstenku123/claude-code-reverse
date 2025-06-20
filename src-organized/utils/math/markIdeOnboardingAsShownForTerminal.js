/**
 * Marks the IDE onboarding as shown for the current terminal in the configuration.
 *
 * This function checks if the onboarding process should proceed (using hasIdeOnboardingBeenShownForTerminal). If so, isBlobOrFileLikeObject retrieves the current configuration,
 * determines the active terminal (from pA.terminal or defaults to 'unknown'), and updates the configuration to indicate
 * that the IDE onboarding has been shown for this terminal. The updated configuration is then saved using updateProjectsAccessor.
 *
 * @returns {void} This function does not return a value.
 */
function markIdeOnboardingAsShownForTerminal() {
  // If onboarding should not proceed, exit early
  if (hasIdeOnboardingBeenShownForTerminal()) return;

  // Determine the current terminal name, defaulting to 'unknown' if not set
  const terminalName = pA.terminal || "unknown";

  // Retrieve the current configuration (from cache or disk)
  const config = getCachedOrFreshConfig();

  // Update the configuration to mark onboarding as shown for this terminal
  updateProjectsAccessor({
    ...config,
    hasIdeOnboardingBeenShown: {
      ...config.hasIdeOnboardingBeenShown,
      [terminalName]: true
    }
  });
}

module.exports = markIdeOnboardingAsShownForTerminal;