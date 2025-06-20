/**
 * Checks if the IDE onboarding has been shown for the current terminal.
 *
 * Retrieves the configuration object (possibly cached), determines the current terminal name,
 * and checks if the onboarding flag is set to true for that terminal.
 *
 * @returns {boolean} True if the IDE onboarding has been shown for the current terminal; otherwise, false.
 */
function hasIdeOnboardingBeenShownForTerminal() {
  // Retrieve the configuration object (from cache or fresh)
  const config = getCachedOrFreshConfig();

  // Determine the current terminal name, defaulting to 'unknown' if not set
  const terminalName = pA.terminal || "unknown";

  // Check if the onboarding flag exists and is true for the current terminal
  return config.hasIdeOnboardingBeenShown?.[terminalName] === true;
}

module.exports = hasIdeOnboardingBeenShownForTerminal;