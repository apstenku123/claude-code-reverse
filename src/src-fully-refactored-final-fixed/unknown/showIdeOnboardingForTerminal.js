/**
 * Updates the configuration to indicate that the IDE onboarding has been shown for the current terminal.
 *
 * This function checks if onboarding should proceed (using hasIdeOnboardingBeenShownForTerminal). If so, isBlobOrFileLikeObject retrieves the current terminal name
 * and the existing configuration, then updates the configuration to mark onboarding as shown for that terminal.
 *
 * @returns {void} No return value.
 */
function showIdeOnboardingForTerminal() {
  // If onboarding should not proceed, exit early
  if (hasIdeOnboardingBeenShownForTerminal()) return;

  // Get the current terminal name, defaulting to 'unknown' if not set
  const terminalName = pA.terminal || "unknown";

  // Retrieve the current configuration object
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

module.exports = showIdeOnboardingForTerminal;