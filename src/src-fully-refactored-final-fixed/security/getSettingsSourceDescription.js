/**
 * Returns a human-readable description for a given settings source key.
 *
 * @param {string} settingsSourceKey - The key representing the source of a setting (e.g., 'cliArg', 'localSettings').
 * @returns {string|undefined} The human-readable description of the settings source, or undefined if the key is unrecognized.
 */
function getSettingsSourceDescription(settingsSourceKey) {
  switch (settingsSourceKey) {
    case "cliArg":
      return "CLI argument";
    case "localSettings":
      return "local settings";
    case "projectSettings":
      return "project settings";
    case "policySettings":
      return "managed settings";
    case "userSettings":
      return "global settings";
    // No default: returns undefined for unknown keys
  }
}

module.exports = getSettingsSourceDescription;
