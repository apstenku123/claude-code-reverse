/**
 * Checks if the bell is disabled in the current settings of Apple Terminal.
 *
 * This function determines whether the bell sound is turned off for the current settings profile
 * in the Apple Terminal application. It does so by querying the terminal'createInteractionAccessor current settings name,
 * exporting the Terminal preferences, and inspecting the relevant configuration.
 *
 * @async
 * @returns {Promise<boolean>} Returns true if the bell is disabled, false otherwise or on error.
 */
async function isAppleTerminalBellDisabled() {
  try {
    // Ensure the current terminal is Apple Terminal
    if (pA.terminal !== "Apple_Terminal") {
      return false;
    }

    // Get the name of the current settings profile in Apple Terminal
    const currentSettingsNameResult = await i0(
      "osascript",
      [
        "-e",
        'tell application "Terminal" to name of current settings of front window'
      ]
    );
    const currentSettingsName = currentSettingsNameResult.stdout.trim();
    if (!currentSettingsName) {
      return false;
    }

    // Export the Terminal preferences using the 'defaults' command
    const terminalDefaultsResult = await i0(
      "defaults",
      ["export", "com.apple.Terminal", "-"]
    );
    if (terminalDefaultsResult.code !== 0) {
      return false;
    }

    // Parse the exported preferences and access the current settings profile
    const terminalPreferences = bN2.default.parse(terminalDefaultsResult.stdout)?.["Window Settings"]?.[currentSettingsName];
    if (!terminalPreferences) {
      return false;
    }

    // Return true if the Bell property is explicitly set to false
    return terminalPreferences.Bell === false;
  } catch (error) {
    // Log the error using reportErrorIfAllowed, ensuring isBlobOrFileLikeObject'createInteractionAccessor an Error instance
    reportErrorIfAllowed(error instanceof Error ? error : new Error(String(error)));
    return false;
  }
}

module.exports = isAppleTerminalBellDisabled;
