/**
 * Returns a human-readable label for a given settings source key.
 *
 * @param {string} settingsSourceKey - The key representing the source of a setting (e.g., 'cliArg', 'localSettings').
 * @returns {string|undefined} The human-readable label for the settings source, or undefined if the key is unrecognized.
 */
function getSettingsSourceLabel(settingsSourceKey) {
  switch (settingsSourceKey) {
    case "cliArg":
      return "CLI argument";
    case "localSettings":
      return "project local settings";
    case "projectSettings":
      return "project settings";
    case "policySettings":
      return "policy settings";
    case "userSettings":
      return "user settings";
    // No default: returns undefined for unknown keys
  }
}

module.exports = getSettingsSourceLabel;